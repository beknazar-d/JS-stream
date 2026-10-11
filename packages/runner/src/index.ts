// Браузерный раннер заданий: компиляция в постоянном Worker,
// исполнение в одноразовом Worker с лимитом времени.
import type { CompileError } from '@platform/tasks-kit/compile';
import { evaluate, type EvaluateDeps, type ExecOutcome, type Report, type TaskBundle } from '@platform/tasks-kit/evaluate';
import type { ExecJob, ExecResult } from '@platform/tasks-kit/exec';

export type { Report, TaskBundle };

export const RUN_TIMEOUT_MS = 5000;

let compileWorker: Worker | undefined;
let nextId = 0;
const pending = new Map<number, (value: { modules: Record<string, string>; errors: CompileError[] }) => void>();

function getCompileWorker(): Worker {
  if (!compileWorker) {
    compileWorker = new Worker(new URL('./compile-worker.ts', import.meta.url), { type: 'module' });
    compileWorker.onmessage = (event) => {
      const { id, ...rest } = event.data;
      pending.get(id)?.(rest);
      pending.delete(id);
    };
  }
  return compileWorker;
}

// Заранее загрузить компилятор, пока человек читает задание.
export function warmUp() {
  getCompileWorker();
}

function compile(files: Record<string, string>) {
  return new Promise<{ modules: Record<string, string>; errors: CompileError[] }>((resolve) => {
    const id = nextId++;
    pending.set(id, resolve);
    getCompileWorker().postMessage({ id, files });
  });
}

function execute(job: ExecJob, timeoutMs = RUN_TIMEOUT_MS): Promise<ExecOutcome> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./exec-worker.ts', import.meta.url), { type: 'module' });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ kind: 'timeout' });
    }, timeoutMs);
    worker.onmessage = (event: MessageEvent<{ ok: true; result: ExecResult } | { ok: false; message: string }>) => {
      clearTimeout(timer);
      worker.terminate();
      if (event.data.ok) resolve({ kind: 'ok', result: event.data.result });
      else reject(new Error(event.data.message));
    };
    worker.onerror = (event) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(event.message || 'Сбой при запуске кода'));
    };
    worker.postMessage(job);
  });
}

const deps: EvaluateDeps = { compile, execute };

export function runTask(bundle: TaskBundle, userFiles: Record<string, string>): Promise<Report> {
  return evaluate(bundle, userFiles, deps);
}

// Запуск отдельного файла (живой пример в уроке): возвращает вывод консоли.
export async function runSnippet(file: string, source: string): Promise<Report> {
  const { modules, errors } = await compile({ [file]: source });
  if (errors.length) {
    return {
      status: 'error',
      checks: [],
      logs: [],
      error: { message: errors.map((e) => `строка ${e.line}: ${e.message}`).join('\n') },
    };
  }
  const outcome = await execute({ modules, tests: [{ file, hidden: false }] });
  if (outcome.kind === 'timeout') {
    return { status: 'timeout', checks: [], logs: [], error: { message: 'Превышено время выполнения' } };
  }
  const { result } = outcome;
  return {
    status: result.error ? 'error' : 'passed',
    checks: [],
    logs: result.logs,
    error: result.error ? { message: result.error.message, hint: result.error.hint } : undefined,
  };
}
