// Проверка решения задания: собирает файлы, компилирует, запускает тесты
// и превращает результат в отчёт для человека. Компиляция и исполнение
// передаются снаружи: в браузере это Web Worker, в CI — worker_threads.

import type { CompileError } from './compile.ts';
import { formatCompileError } from './compile.ts';
import type { ExecJob, ExecResult, LogEntry } from './exec.ts';
import { TIMEOUT_EXPLANATION } from './explain.ts';
import type { TaskMeta } from './meta.ts';

export interface TaskBundle {
  // Путь задания относительно /content, например m01-js-basics/l01-values/tasks/t01-order-total.
  id: string;
  meta: TaskMeta;
  description: string;
  // Все файлы задания относительно его папки: starter/index.js, tests/public.test.js, ...
  files: Record<string, string>;
}

export interface Check {
  name: string;
  status: 'passed' | 'failed';
  hidden: boolean;
  message?: string;
  hint?: string;
}

export type ReportStatus = 'passed' | 'failed' | 'error' | 'timeout';

export interface Report {
  status: ReportStatus;
  checks: Check[];
  logs: LogEntry[];
  error?: { message: string; hint?: string };
}

export type ExecOutcome = { kind: 'ok'; result: ExecResult } | { kind: 'timeout' };

export interface EvaluateDeps {
  compile: (files: Record<string, string>) => Promise<{ modules: Record<string, string>; errors: CompileError[] }>;
  execute: (job: ExecJob) => Promise<ExecOutcome>;
}

const TEST_FILE = /\.test\.[jt]s$/;

export function filesIn(files: Record<string, string>, dir: string): Record<string, string> {
  const prefix = dir.endsWith('/') ? dir : `${dir}/`;
  const result: Record<string, string> = {};
  for (const [path, source] of Object.entries(files)) {
    if (path.startsWith(prefix) && !path.slice(prefix.length).includes('/')) {
      result[path.slice(prefix.length)] = source;
    }
  }
  return result;
}

export function subdirs(files: Record<string, string>, dir: string): string[] {
  const prefix = `${dir}/`;
  const names = new Set<string>();
  for (const path of Object.keys(files)) {
    if (path.startsWith(prefix)) {
      const rest = path.slice(prefix.length);
      if (rest.includes('/')) names.add(rest.split('/')[0]);
    }
  }
  return [...names].sort();
}

// Файлы, которые редактирует человек (имя → исходный код). Берутся из starter/.
export function editableFiles(bundle: TaskBundle): Record<string, string> {
  const files = filesIn(bundle.files, 'starter');
  delete files['README.md'];
  return files;
}

function testOrder(a: string, b: string): number {
  const hidden = (name: string) => (name.includes('hidden') ? 1 : 0);
  return hidden(a) - hidden(b) || a.localeCompare(b);
}

const timeoutReport = (): Report => ({
  status: 'timeout',
  checks: [],
  logs: [],
  error: { message: 'Превышено время выполнения', hint: TIMEOUT_EXPLANATION },
});

function compileErrorReport(errors: CompileError[]): Report {
  return {
    status: 'error',
    checks: [],
    logs: [],
    error: {
      message: errors.slice(0, 5).map(formatCompileError).join('\n'),
      hint: 'Код не удалось разобрать. Проверьте парные скобки, кавычки и запятые около указанной строки.',
    },
  };
}

async function runTests(
  deps: EvaluateDeps,
  sources: Record<string, string>,
  testFiles: string[],
  editable: string[],
): Promise<{ report?: Report; result?: ExecResult }> {
  const { modules, errors } = await deps.compile(sources);
  if (errors.length) {
    // Ошибки в файлах человека показываем как есть; ошибка в тестах — проблема задания.
    const own = errors.filter((e) => editable.includes(e.file));
    return { report: compileErrorReport(own.length ? own : errors) };
  }
  const outcome = await deps.execute({
    modules,
    tests: testFiles.map((file) => ({ file, hidden: file.includes('hidden') })),
  });
  if (outcome.kind === 'timeout') return { report: timeoutReport() };
  return { result: outcome.result };
}

function toReport(result: ExecResult): Report {
  const checks: Check[] = result.tests.map((t) => ({
    name: t.name,
    status: t.status,
    hidden: t.hidden,
    message: t.message,
    hint: t.hint,
  }));
  if (result.error) {
    return {
      status: 'error',
      checks,
      logs: result.logs,
      error: { message: `${result.error.file}: ${result.error.message}`, hint: result.error.hint },
    };
  }
  const failed = checks.some((c) => c.status === 'failed');
  return { status: failed || checks.length === 0 ? 'failed' : 'passed', checks, logs: result.logs };
}

async function evaluateCode(bundle: TaskBundle, userFiles: Record<string, string>, deps: EvaluateDeps): Promise<Report> {
  const testDir = filesIn(bundle.files, 'tests');
  const testFiles = Object.keys(testDir).filter((f) => TEST_FILE.test(f)).sort(testOrder);
  const { report, result } = await runTests(deps, { ...testDir, ...userFiles }, testFiles, Object.keys(userFiles));
  return report ?? toReport(result!);
}

async function evaluateWriteTests(bundle: TaskBundle, userFiles: Record<string, string>, deps: EvaluateDeps): Promise<Report> {
  const userTests = Object.keys(userFiles).filter((f) => TEST_FILE.test(f));
  const support = filesIn(bundle.files, 'tests');
  const checks: Check[] = [];
  const logs: LogEntry[] = [];

  const subject = filesIn(bundle.files, 'subject');
  const base = await runTests(deps, { ...support, ...subject, ...userFiles }, userTests, Object.keys(userFiles));
  if (base.report) return base.report;
  const baseResult = base.result!;
  logs.push(...baseResult.logs);
  if (baseResult.error) return toReport(baseResult);
  if (baseResult.tests.length === 0) {
    return {
      status: 'failed',
      checks: [],
      logs,
      error: { message: 'В файле нет ни одного теста.', hint: 'Добавьте хотя бы один вызов it("…", () => { … }).' },
    };
  }
  const brokenOnCorrect = baseResult.tests.filter((t) => t.status === 'failed');
  checks.push({
    name: `Тесты проходят на правильной реализации (${baseResult.tests.length} шт.)`,
    status: brokenOnCorrect.length ? 'failed' : 'passed',
    hidden: false,
    message: brokenOnCorrect.length
      ? brokenOnCorrect.map((t) => `Тест «${t.name}» падает на правильном коде:\n${t.message}`).join('\n\n')
      : undefined,
    hint: brokenOnCorrect.length
      ? 'Хороший тест проходит на правильном коде. Проверьте ожидаемые значения в своих тестах.'
      : undefined,
  });

  const mutants = bundle.meta.mutants ?? [];
  for (const [index, mutant] of mutants.entries()) {
    const files = filesIn(bundle.files, `mutants/${mutant.name}`);
    const run = await runTests(deps, { ...support, ...files, ...userFiles }, userTests, Object.keys(userFiles));
    const caught =
      run.report?.status === 'timeout' ||
      Boolean(run.result?.error) ||
      Boolean(run.result?.tests.some((t) => t.status === 'failed'));
    checks.push({
      name: `Тесты ловят ошибку №${index + 1}`,
      status: caught ? 'passed' : 'failed',
      hidden: false,
      message: caught
        ? `Поймана ошибка: ${mutant.description}`
        : 'Есть реализация с ошибкой, на которой все ваши тесты проходят.',
      hint: caught ? undefined : 'Подумайте, какие входные данные ещё не проверены: пустые значения, границы, необычные сочетания.',
    });
  }
  const failed = checks.some((c) => c.status === 'failed');
  return { status: failed ? 'failed' : 'passed', checks, logs };
}

export function evaluate(bundle: TaskBundle, userFiles: Record<string, string>, deps: EvaluateDeps): Promise<Report> {
  return bundle.meta.type === 'write-tests'
    ? evaluateWriteTests(bundle, userFiles, deps)
    : evaluateCode(bundle, userFiles, deps);
}
