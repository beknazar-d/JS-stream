// Браузерный раннер заданий: компиляция в постоянном Worker,
// исполнение в одноразовом Worker с лимитом времени.
import type { CompileError } from '@platform/tasks-kit/compile';
import { evaluate, type EvaluateDeps, type ExecOutcome, type Report, type TaskBundle } from '@platform/tasks-kit/evaluate';
import type { ExecJob, ExecResult } from '@platform/tasks-kit/exec';
import { buildDocument, type HtmlRun, type MockApi } from '@platform/tasks-kit/html';
import { runHtmlJob } from '@platform/tasks-kit/page-host';
// Обвязка страницы собирается плагином сайта (vite.config.ts) в один скрипт.
import pageHarness from 'virtual:page-harness';

export type { Report, TaskBundle };

export const RUN_TIMEOUT_MS = 5000;

let compileWorker: Worker | undefined;
let nextId = 0;
const pending = new Map<number, (value: unknown) => void>();

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
    pending.set(id, resolve as (value: unknown) => void);
    getCompileWorker().postMessage({ id, kind: 'compile', files });
  });
}

// Скрипты страницы с защитой от бесконечных циклов.
export function guardLoops(files: Record<string, string>) {
  return new Promise<{ files: Record<string, string>; errors: CompileError[] }>((resolve) => {
    const id = nextId++;
    pending.set(id, resolve as (value: unknown) => void);
    getCompileWorker().postMessage({ id, kind: 'guard', files });
  });
}

function executeHtml(run: HtmlRun): Promise<ExecOutcome> {
  return runHtmlJob(run, pageHarness, RUN_TIMEOUT_MS + 3000);
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

const deps: EvaluateDeps = { compile, execute, executeHtml, guardLoops };

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

// Документ для живого предпросмотра: та же сборка, что и при проверке, но без тестов.
export async function previewDocument(files: Record<string, string>, api?: MockApi): Promise<string> {
  const scripts = Object.fromEntries(Object.entries(files).filter(([name]) => /\.m?js$/.test(name)))
  const guarded = await guardLoops(scripts)
  return buildDocument({ ...files, ...guarded.files }, { harness: '', api })
}
