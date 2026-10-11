// Исполнитель для CI: тот же execute(), что и в браузере, но в worker_threads.
import { parentPort } from 'node:worker_threads';
import { execute, type ExecJob } from '../src/exec.ts';

parentPort!.on('message', async (message: { id: number; job: ExecJob }) => {
  const result = await execute(message.job);
  parentPort!.postMessage({ id: message.id, result });
});
