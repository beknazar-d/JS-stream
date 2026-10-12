import ts from 'typescript';
import { afterAll, describe, expect, it } from 'vitest';
import { compileAll } from '../src/compile.ts';
import { evaluate, type EvaluateDeps, type TaskBundle } from '../src/evaluate.ts';
import { execute } from '../src/exec.ts';
import { deepEqual, format } from '../src/format.ts';
import { validateTaskMeta, type TaskMeta } from '../src/meta.ts';
import { expect as check } from '../src/test-api.ts';
import { createPool } from '../node/pool.ts';

describe('format', () => {
  it('показывает значения как в коде', () => {
    expect(format('заказ')).toBe('"заказ"');
    expect(format([1, 'a', null])).toBe('[1, "a", null]');
    expect(format({ id: 7, items: [] })).toBe('{ id: 7, items: [] }');
    expect(format(NaN)).toBe('NaN');
    expect(format(undefined)).toBe('undefined');
  });
});

describe('deepEqual', () => {
  it('сравнивает по содержимому', () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 1, b: undefined })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 1, b: undefined }, true)).toBe(false);
    expect(deepEqual([1, 2], [2, 1])).toBe(false);
    expect(deepEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true);
    expect(deepEqual(NaN, NaN)).toBe(true);
  });
});

describe('expect из tasks-kit', () => {
  it('пишет, что ожидалось и что получено', () => {
    expect(() => check(NaN).toBe(120)).toThrow('Ожидалось: 120\nПолучено:  NaN');
    expect(() => check({ a: 1 }).toBe({ a: 1 })).toThrow(/toEqual/);
    expect(() => check(3, 'Сумма заказа').toEqual(4)).toThrow(/^Сумма заказа\n/);
    expect(() => check(1).not.toBe(1)).toThrow('Ожидалось: не 1');
  });

  it('toThrow и toBeCloseTo', () => {
    check(() => {
      throw new Error('Пустая корзина');
    }).toThrow('корзина');
    check(0.1 + 0.2).toBeCloseTo(0.3);
    expect(() => check(() => 1).toThrow()).toThrow('функция выполнилась без ошибки');
  });

  it('resolves и rejects', async () => {
    await check(Promise.resolve(5)).resolves.toBe(5);
    await check(Promise.reject(new Error('нет связи'))).rejects.toThrow('нет связи');
    await expect(check(Promise.resolve(1)).rejects.toBe(1)).rejects.toThrow(/завершится ошибкой/);
  });
});

function compileJob(files: Record<string, string>) {
  const { modules, errors } = compileAll(ts, files);
  expect(errors).toEqual([]);
  return modules;
}

describe('execute', () => {
  it('запускает тесты против кода человека и собирает вывод', async () => {
    const modules = compileJob({
      'index.js': 'export function total(items) { console.log("считаю", items.length); return items.reduce((s, i) => s + i.price, 0); }',
      'public.test.js': `
        import { total } from './index.js';
        describe('total', () => {
          it('складывает цены', () => { expect(total([{ price: 2 }, { price: 3 }])).toBe(5); });
          it('пустая корзина', () => { expect(total([])).toBe(1); });
        });`,
    });
    const result = await execute({ modules, tests: [{ file: 'public.test.js', hidden: false }] });
    expect(result.tests.map((t) => [t.name, t.status])).toEqual([
      ['total › складывает цены', 'passed'],
      ['total › пустая корзина', 'failed'],
    ]);
    expect(result.logs[0]).toEqual({ level: 'log', text: 'считаю 2' });
  });

  it('объясняет ошибку, если функция не экспортирована', async () => {
    const modules = compileJob({
      'index.js': 'function total() { return 1; }',
      'public.test.js': "import { total } from './index.js'; it('t', () => { expect(total()).toBe(1); });",
    });
    const result = await execute({ modules, tests: [{ file: 'public.test.js', hidden: false }] });
    expect(result.tests[0].message).toBe('TypeError: total is not a function');
    expect(result.tests[0].hint).toMatch(/не экспортирована/);
  });

  it('runSnippet возвращает строки вывода', async () => {
    const modules = compileJob({
      'snippet.js': 'console.log(1 + "2"); console.log([1, 2]);',
      'answer.js': 'export const output = ["12", "[1, 2]"];',
      'public.test.js': "import { output } from './answer.js'; it('вывод', () => { expect(output).toEqual(runSnippet('snippet.js')); });",
    });
    const result = await execute({ modules, tests: [{ file: 'public.test.js', hidden: false }] });
    expect(result.tests[0].status).toBe('passed');
  });
});

const meta = (patch: Partial<TaskMeta>): TaskMeta => ({
  order: 1,
  title: 'Сумма заказа',
  type: 'implement',
  role: 'main',
  difficulty: 2,
  minutes: 10,
  language: 'js',
  tags: ['массивы'],
  hints: ['a', 'b', 'c'],
  wrong: [
    { name: 'a', kind: 'partial', explanation: 'x' },
    { name: 'b', kind: 'edge-case', explanation: 'x' },
    { name: 'c', kind: 'common-mistake', explanation: 'x' },
  ],
  ...patch,
});

describe('validateTaskMeta', () => {
  it('принимает корректные метаданные и находит ошибки', () => {
    expect(validateTaskMeta(meta({}))).toEqual([]);
    expect(validateTaskMeta({ ...meta({}), hints: ['a'] })).toContain('hints: ровно три подсказки (направление, шаг, почти решение)');
  });
});

describe('evaluate', () => {
  const pool = createPool(1500, 2);
  afterAll(() => pool.close());
  const deps: EvaluateDeps = { compile: async (files) => compileAll(ts, files), execute: pool.execute };

  const bundle: TaskBundle = {
    id: 'test/task',
    meta: meta({}),
    description: '',
    files: {
      'starter/index.js': 'export function total(items) {}',
      'tests/public.test.js': "import { total } from './index.js'; it('сумма', () => { expect(total([{ price: 2 }])).toBe(2); });",
      'tests/hidden.test.js': "import { total } from './index.js'; it('пусто', () => { expect(total([])).toBe(0); });",
    },
  };

  it('засчитывает правильное решение', async () => {
    const report = await evaluate(bundle, { 'index.js': 'export const total = (items) => items.reduce((s, i) => s + i.price, 0);' }, deps);
    expect(report.status).toBe('passed');
    expect(report.checks.map((c) => c.hidden)).toEqual([false, true]);
  });

  it('прерывает бесконечный цикл', async () => {
    const report = await evaluate(bundle, { 'index.js': 'export function total() { while (true) {} }' }, deps);
    expect(report.status).toBe('timeout');
    expect(report.error?.hint).toMatch(/бесконечный цикл/);
  });

  it('сообщает о синтаксической ошибке', async () => {
    const report = await evaluate(bundle, { 'index.js': 'export function total( {' }, deps);
    expect(report.status).toBe('error');
    expect(report.error?.message).toMatch(/index\.js, строка 1/);
  });

  it('write-tests: проверяет тесты на мутантах', async () => {
    const writeTests: TaskBundle = {
      id: 'test/write',
      meta: meta({ type: 'write-tests', mutants: [{ name: 'no-empty', description: 'пустая корзина даёт NaN' }] }),
      description: '',
      files: {
        'starter/index.test.js': '',
        'subject/index.js': 'export const total = (items) => items.reduce((s, i) => s + i.price, 0);',
        'mutants/no-empty/index.js': 'export const total = (items) => items.length ? items.reduce((s, i) => s + i.price, 0) : NaN;',
      },
    };
    const weak = "import { total } from './index.js'; it('сумма', () => { expect(total([{ price: 1 }])).toBe(1); });";
    const strong = `${weak} it('пусто', () => { expect(total([])).toBe(0); });`;
    const weakReport = await evaluate(writeTests, { 'index.test.js': weak }, deps);
    expect(weakReport.status).toBe('failed');
    const strongReport = await evaluate(writeTests, { 'index.test.js': strong }, deps);
    expect(strongReport.status).toBe('passed');
    expect(strongReport.checks[1].message).toMatch(/NaN/);
  });
});

describe('управляемое время (timers)', () => {
  it('повторы с паузой проверяются без ожидания', async () => {
    const modules = compileJob({
      'index.js': `
        export async function withRetry(load, attempts, pauseMs) {
          for (let i = 1; ; i++) {
            try { return await load(); }
            catch (error) {
              if (i >= attempts) throw error;
              await new Promise((r) => setTimeout(r, pauseMs * i));
            }
          }
        }`,
      'public.test.js': `
        import { withRetry } from './index.js';
        it('третья попытка удачная', async () => {
          timers.useFake();
          let calls = 0;
          const load = async () => { calls++; if (calls < 3) throw new Error('503'); return 'ok'; };
          const result = withRetry(load, 3, 1000);
          await timers.advance(999);
          expect(calls, 'до первой паузы').toBe(1);
          await timers.advance(1);
          expect(calls).toBe(2);
          await timers.advance(2000);
          await expect(result).resolves.toBe('ok');
          expect(Date.now()).toBe(Date.parse('2025-01-01T00:00:03Z'));
        });
        it('после теста время снова настоящее', () => {
          expect(Date.now()).toBeGreaterThan(Date.parse('2026-01-01'));
        });`,
    });
    const started = Date.now();
    const result = await execute({ modules, tests: [{ file: 'public.test.js', hidden: false }] });
    expect(result.tests.map((t) => [t.name, t.status, t.message])).toEqual([
      ['третья попытка удачная', 'passed', undefined],
      ['после теста время снова настоящее', 'passed', undefined],
    ]);
    expect(Date.now() - started).toBeLessThan(1000);
  });
});

describe('проверка типов (typecheck)', () => {
  it('ошибки типов и тесты типов становятся проверками', async () => {
    const { typecheck } = await import('../src/typecheck.ts');
    const { loadTsLibs } = await import('../node/ts-libs.ts');
    const pool2 = createPool(3000, 1);
    const deps: EvaluateDeps = {
      compile: async (files) => compileAll(ts, files),
      execute: pool2.execute,
      typecheck: async (files) => typecheck(ts, files, loadTsLibs()),
    };
    const bundle: TaskBundle = {
      id: 'test/types',
      meta: meta({ language: 'ts', typecheck: true }),
      description: '',
      files: {
        'starter/index.ts': '',
        'tests/public.test.ts': "import { pay } from './index.js'; it('оплата', () => { expect(pay({ id: 1, status: 'new' }).status).toBe('paid'); });",
        'tests/order.types.ts': "import type { Order, Status } from './index.js';\ntype cases = [Expect<Equal<Order['status'], Status>>, Expect<Equal<Status, 'new' | 'paid'>>];",
      },
    };
    const good = "export type Status = 'new' | 'paid';\nexport interface Order { id: number; status: Status }\nexport function pay(o: Order): Order { return { ...o, status: 'paid' }; }";
    const loose = "export type Status = string;\nexport interface Order { id: number; status: Status }\nexport function pay(o: Order): Order { return { ...o, status: 'paid' }; }";
    const goodReport = await evaluate(bundle, { 'index.ts': good }, deps);
    expect(goodReport.status).toBe('passed');
    expect(goodReport.checks.map((c) => c.name)).toEqual(['Типы в index.ts без ошибок (strict)', 'Тесты типов: order.types.ts', 'оплата']);
    const looseReport = await evaluate(bundle, { 'index.ts': loose }, deps);
    expect(looseReport.status).toBe('failed');
    expect(looseReport.checks[1].message).toMatch(/TS2344/);
    await pool2.close();
  }, 30000);
});

describe('runSnippetAsync', () => {
  it('собирает вывод в порядке event loop', async () => {
    const modules = compileJob({
      'snippet.js': "console.log('1'); setTimeout(() => console.log('4'), 0); Promise.resolve().then(() => console.log('3')); console.log('2');",
      'public.test.js': "it('порядок', async () => { expect(await runSnippetAsync('snippet.js')).toEqual(['1', '2', '3', '4']); });",
    });
    const result = await execute({ modules, tests: [{ file: 'public.test.js', hidden: false }] });
    expect(result.tests[0].status).toBe('passed');
  });
});
