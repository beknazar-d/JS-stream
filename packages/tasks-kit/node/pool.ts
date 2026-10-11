// Пул worker_threads с лимитом времени: зависший код останавливается terminate().
import { availableParallelism } from 'node:os';
import { Worker } from 'node:worker_threads';
import type { ExecJob, ExecResult } from '../src/exec.ts';
import type { ExecOutcome } from '../src/evaluate.ts';

const WORKER_URL = new URL('./exec-worker.ts', import.meta.url);

interface Slot {
  worker: Worker;
  busy: boolean;
}

export function createPool(timeoutMs = 5000, size = Math.max(1, availableParallelism() - 1)) {
  const slots: Slot[] = [];
  const waiting: ((slot: Slot) => void)[] = [];
  let nextId = 0;

  const spawn = (): Slot => ({ worker: new Worker(WORKER_URL), busy: false });

  const acquire = (): Promise<Slot> => {
    const free = slots.find((s) => !s.busy);
    if (free) {
      free.busy = true;
      return Promise.resolve(free);
    }
    if (slots.length < size) {
      const slot = spawn();
      slot.busy = true;
      slots.push(slot);
      return Promise.resolve(slot);
    }
    return new Promise((resolve) => waiting.push(resolve));
  };

  const release = (slot: Slot) => {
    const next = waiting.shift();
    if (next) next(slot);
    else slot.busy = false;
  };

  const execute = async (job: ExecJob): Promise<ExecOutcome> => {
    const slot = await acquire();
    const id = nextId++;
    return new Promise<ExecOutcome>((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        void slot.worker.terminate();
        slot.worker = spawn().worker;
        release(slot);
        resolve({ kind: 'timeout' });
      }, timeoutMs);
      const onMessage = (message: { id: number; result: ExecResult }) => {
        if (message.id !== id) return;
        cleanup();
        release(slot);
        resolve({ kind: 'ok', result: message.result });
      };
      const onError = (error: Error) => {
        cleanup();
        slot.worker = spawn().worker;
        release(slot);
        reject(error);
      };
      const cleanup = () => {
        clearTimeout(timer);
        slot.worker.off('message', onMessage);
        slot.worker.off('error', onError);
      };
      slot.worker.on('message', onMessage);
      slot.worker.on('error', onError);
      slot.worker.postMessage({ id, job });
    });
  };

  const close = () => Promise.all(slots.map((s) => s.worker.terminate()));
  return { execute, close };
}
