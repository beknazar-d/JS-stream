// Исполнение уже скомпилированного (CommonJS) кода и тестов.
// Не зависит от Node и DOM: запускается внутри Web Worker или worker_threads.
// Лимит времени на синхронный код обеспечивает вызывающая сторона (terminate).

import { cleanMessage, explainError } from './explain.ts';
import { format } from './format.ts';
import { createFakeTimers } from './fake-timers.ts';
import { AssertionError, createSuite } from './test-api.ts';

// Настоящие таймеры: тест может подменить глобальные через timers.useFake().
const realSetTimeout = globalThis.setTimeout;
const realClearTimeout = globalThis.clearTimeout;

export interface ExecJob {
  // Имя файла (index.js, snippet.js, public.test.js) → код в формате CommonJS.
  modules: Record<string, string>;
  tests: { file: string; hidden: boolean }[];
  // Лимит для одного асинхронного теста, мс.
  testTimeoutMs?: number;
}

export type TestStatus = 'passed' | 'failed';

export interface TestResult {
  name: string;
  file: string;
  hidden: boolean;
  status: TestStatus;
  message?: string;
  hint?: string;
}

export interface LogEntry {
  level: 'log' | 'info' | 'warn' | 'error';
  text: string;
}

export interface ExecResult {
  tests: TestResult[];
  logs: LogEntry[];
  // Ошибка загрузки файла (синтаксис, исключение на верхнем уровне модуля).
  error?: { file: string; message: string; hint?: string };
}

const MAX_LOGS = 300;

export function moduleKey(request: string): string {
  const base = request.split('/').pop() ?? request;
  return base.replace(/\.(m?[jt]s|tsx?|jsx)$/, '');
}

function formatLogArgs(args: unknown[]): string {
  return args.map((arg) => (typeof arg === 'string' ? arg : format(arg))).join(' ');
}

function createConsole(sink: (entry: LogEntry) => void) {
  const make = (level: LogEntry['level']) => (...args: unknown[]) => sink({ level, text: formatLogArgs(args) });
  return {
    log: make('log'),
    info: make('info'),
    debug: make('log'),
    warn: make('warn'),
    error: make('error'),
    table: (data: unknown) => sink({ level: 'log', text: format(data) }),
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return cleanMessage(`${error.name === 'Error' ? '' : `${error.name}: `}${error.message}`);
  return `Выброшено значение ${format(error)}`;
}

export async function execute(job: ExecJob): Promise<ExecResult> {
  const logs: LogEntry[] = [];
  const pushLog = (entry: LogEntry) => {
    if (logs.length < MAX_LOGS) logs.push(entry);
    else if (logs.length === MAX_LOGS) logs.push({ level: 'warn', text: '… вывод обрезан: слишком много строк' });
  };
  const userConsole = createConsole(pushLog);
  const codeByKey = new Map<string, { file: string; code: string }>();
  for (const [file, code] of Object.entries(job.modules)) codeByKey.set(moduleKey(file), { file, code });

  const results: TestResult[] = [];
  const testTimeout = job.testTimeoutMs ?? 2000;

  for (const testFile of job.tests) {
    const suite = createSuite();
    const timers = createFakeTimers();
    const cache = new Map<string, { exports: unknown }>();

    const runModule = (key: string, consoleImpl: unknown, fresh: boolean): unknown => {
      const entry = codeByKey.get(key);
      if (!entry) {
        const available = [...codeByKey.values()].map((m) => m.file).join(', ');
        throw new Error(`Файл «${key}» не найден. Доступны: ${available}`);
      }
      if (!fresh && cache.has(key)) return cache.get(key)!.exports;
      const module = { exports: {} as unknown };
      if (!fresh) cache.set(key, module);
      const globals = { ...suite.globals, runSnippet, timers };
      const factory = new Function('require', 'module', 'exports', 'console', ...Object.keys(globals), entry.code);
      factory(require, module, module.exports, consoleImpl, ...Object.values(globals));
      return module.exports;
    };
    const require = (request: string) => runModule(moduleKey(request), userConsole, false);
    // Запускает файл заново и возвращает строки, которые он вывел в консоль.
    const runSnippet = (file: string): string[] => {
      const lines: string[] = [];
      runModule(moduleKey(file), createConsole((e) => lines.push(e.text)), true);
      return lines;
    };

    try {
      runModule(moduleKey(testFile.file), userConsole, false);
    } catch (error) {
      return {
        tests: results,
        logs,
        error: { file: testFile.file, message: errorMessage(error), hint: explainError(error) },
      };
    }

    for (const test of suite.collect()) {
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([
          test.run(),
          new Promise((_, reject) => {
            timer = realSetTimeout(
              () => reject(new Error(`Тест не завершился за ${testTimeout} мс. Возможно, промис никогда не выполняется.`)),
              testTimeout,
            );
          }),
        ]);
        results.push({ name: test.name, file: testFile.file, hidden: testFile.hidden, status: 'passed' });
      } catch (error) {
        results.push({
          name: test.name,
          file: testFile.file,
          hidden: testFile.hidden,
          status: 'failed',
          message: error instanceof AssertionError ? error.message : errorMessage(error),
          hint: error instanceof AssertionError ? undefined : explainError(error),
        });
      } finally {
        realClearTimeout(timer);
        timers.useReal();
      }
    }
  }
  return { tests: results, logs };
}
