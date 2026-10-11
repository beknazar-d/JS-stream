// npm run verify [фильтр]
// Проверяет весь контент: структуру уроков и заданий, что эталоны проходят
// тесты, а неверные решения и заготовки — нет, что примеры уроков запускаются.

import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { compileAll, guardPageScripts } from '../src/compile.ts';
import { editableFiles, evaluate, filesIn, subdirs, type EvaluateDeps, type Report } from '../src/evaluate.ts';
import {
  LESSON_SECTIONS,
  TASK_SECTIONS,
  headings,
  validateCards,
  validateLessonMeta,
  validateModuleMeta,
  validateTaskMeta,
  type TaskMeta,
} from '../src/meta.ts';
import { loadContent, type LessonOnDisk } from '../node/load.ts';
import { createPool } from '../node/pool.ts';
import { createPageRunner } from '../node/page-runner.ts';

const contentRoot = fileURLToPath(new URL('../../../content', import.meta.url));
const filter = process.argv[2];
const pool = createPool(5000);
const pages = createPageRunner();
const deps: EvaluateDeps = {
  compile: async (files) => compileAll(ts, files),
  execute: pool.execute,
  executeHtml: pages.executeHtml,
  guardLoops: async (files) => guardPageScripts(ts, files),
};

const problems: string[] = [];
let checkedTasks = 0;
let checkedLessons = 0;

const fail = (where: string, message: string) => problems.push(`✗ ${where}: ${message}`);

function summarize(report: Report): string {
  if (report.error) return report.error.message.split('\n')[0];
  const failed = report.checks.filter((c) => c.status === 'failed');
  return failed.map((c) => `«${c.name}»: ${(c.message ?? '').split('\n')[0]}`).join('; ') || 'нет ни одного теста';
}

function checkSections(where: string, text: string | undefined, required: readonly string[], level: number) {
  if (text === undefined) return fail(where, 'файл отсутствует');
  const found = headings(text, level);
  let cursor = 0;
  for (const section of required) {
    const index = found.findIndex((h, i) => i >= cursor && h.startsWith(section));
    if (index === -1) fail(where, `нет раздела «${section}» (или он не по порядку)`);
    else cursor = index + 1;
  }
}

async function verifyTask(where: string, bundle: LessonOnDisk['tasks'][number]['bundle'], rawMeta: unknown) {
  const metaErrors = validateTaskMeta(rawMeta);
  for (const error of metaErrors) fail(where, `meta.yaml: ${error}`);
  if (metaErrors.length) return;
  const meta = rawMeta as TaskMeta;
  checkSections(`${where}/task.md`, bundle.files['task.md'], TASK_SECTIONS, 2);

  const starter = editableFiles(bundle);
  const editable = Object.keys(starter);
  if (editable.length === 0) return fail(where, 'starter/ пуст');
  const solution = filesIn(bundle.files, 'solution');
  for (const file of editable) if (!(file in solution)) fail(where, `solution/${file} отсутствует`);
  if (!bundle.files['solution/README.md']) fail(where, 'solution/README.md (разбор эталона) отсутствует');
  for (const file of meta.show ?? []) if (!(file in bundle.files)) fail(where, `show: файл ${file} не найден`);

  const testFiles = Object.keys(filesIn(bundle.files, 'tests')).filter((f) => /\.test\.[jt]s$/.test(f));
  if (meta.type === 'write-tests') {
    if (Object.keys(filesIn(bundle.files, 'subject')).length === 0) fail(where, 'subject/ (проверяемый код) пуст');
    const onDisk = subdirs(bundle.files, 'mutants');
    for (const mutant of meta.mutants ?? []) {
      if (!onDisk.includes(mutant.name)) fail(where, `mutants/${mutant.name} отсутствует`);
    }
  } else {
    if (testFiles.length === 0) fail(where, 'tests/ без файлов *.test.js');
    if (['implement', 'fix-bug', 'refactor', 'layout', 'api'].includes(meta.type) && !testFiles.some((f) => f.includes('hidden'))) {
      fail(where, 'для этого типа нужны скрытые тесты (tests/hidden.test.js)');
    }
  }
  const wrongDirs = subdirs(bundle.files, 'wrong');
  for (const wrong of meta.wrong) if (!wrongDirs.includes(wrong.name)) fail(where, `wrong/${wrong.name} отсутствует`);
  if (problems.some((p) => p.startsWith(`✗ ${where}`))) return;

  const solutionReport = await evaluate(bundle, pick(solution, editable), deps);
  if (solutionReport.status !== 'passed') fail(where, `эталон не проходит: ${summarize(solutionReport)}`);

  const starterReport = await evaluate(bundle, starter, deps);
  if (starterReport.status === 'passed') fail(where, 'заготовка уже проходит все тесты');

  for (const wrong of meta.wrong) {
    const files = { ...starter, ...filesIn(bundle.files, `wrong/${wrong.name}`) };
    const report = await evaluate(bundle, pick(files, editable), deps);
    if (report.status === 'passed') fail(where, `неверное решение wrong/${wrong.name} проходит все тесты`);
  }
  checkedTasks++;
}

function pick(files: Record<string, string>, names: string[]) {
  return Object.fromEntries(names.map((name) => [name, files[name] ?? '']));
}

async function verifyExamples(lesson: LessonOnDisk) {
  for (const [file, source] of Object.entries(lesson.examples)) {
    if (!/\.[jt]s$/.test(file)) continue;
    const where = `${lesson.id}/examples/${file}`;
    const { modules, errors } = compileAll(ts, { [file]: source });
    if (errors.length) {
      fail(where, errors[0].message);
      continue;
    }
    const outcome = await pool.execute({ modules, tests: [{ file, hidden: false }] });
    if (outcome.kind === 'timeout') {
      fail(where, 'превышено время выполнения');
      continue;
    }
    const { result } = outcome;
    if (result.error) {
      fail(where, `пример падает: ${result.error.message}`);
      continue;
    }
    const expected = lesson.examples[file.replace(/\.[jt]s$/, '.out.txt')];
    const actual = result.logs.map((l) => l.text).join('\n');
    if (expected !== undefined && expected.trimEnd() !== actual.trimEnd()) {
      fail(where, `вывод отличается от ожидаемого.\n    Ожидалось:\n${indent(expected.trimEnd())}\n    Получено:\n${indent(actual)}`);
    }
  }
}

const indent = (text: string) => text.split('\n').map((line) => `      ${line}`).join('\n');

async function verifyLesson(lesson: LessonOnDisk) {
  const where = lesson.id;
  for (const error of validateLessonMeta(lesson.meta)) fail(`${where}/lesson.yaml`, error);
  checkSections(`${where}/lesson.mdx`, lesson.mdx, LESSON_SECTIONS, 2);
  if (lesson.cards === undefined) fail(where, 'cards.yaml (карточки повторения) отсутствует');
  else for (const error of validateCards(lesson.cards)) fail(`${where}/cards.yaml`, error);

  const roles = { warmup: 0, main: 0, real: 0 };
  const orders = new Set<number>();
  for (const task of lesson.tasks) {
    const meta = task.rawMeta as Partial<TaskMeta> | undefined;
    if (meta?.role && meta.role in roles) roles[meta.role]++;
    if (meta?.order !== undefined) {
      if (orders.has(meta.order)) fail(where, `два задания с order: ${meta.order}`);
      orders.add(meta.order);
    }
  }
  if (lesson.tasks.length < 6) fail(where, `заданий ${lesson.tasks.length}, нужно не меньше шести`);
  if (roles.warmup < 3 || roles.main < 2 || roles.real < 1) {
    fail(where, `нужно 3 разминки, 2 основных и 1 реальная задача, сейчас ${roles.warmup}/${roles.main}/${roles.real}`);
  }
  await verifyExamples(lesson);
  await Promise.all(lesson.tasks.map((task) => verifyTask(task.bundle.id, task.bundle, task.rawMeta)));
  checkedLessons++;
}

const modules = loadContent(contentRoot);
for (const module of modules) {
  if (filter && !module.id.includes(filter) && !module.lessons.some((l) => l.id.includes(filter))) continue;
  for (const error of validateModuleMeta(module.meta)) fail(`${module.id}/module.yaml`, error);
  for (const lesson of module.lessons) {
    if (filter && !lesson.id.includes(filter) && !module.id.includes(filter)) continue;
    await verifyLesson(lesson);
  }
}
await pool.close();
await pages.close();

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\nНайдено проблем: ${problems.length}. Уроков: ${checkedLessons}, заданий проверено полностью: ${checkedTasks}.`);
  process.exit(1);
}
console.log(`✓ Контент в порядке. Уроков: ${checkedLessons}, заданий: ${checkedTasks}.`);
