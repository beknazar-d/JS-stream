// Минимальный раннер тестов с API в стиле Vitest/Jest.
// Сообщения об ошибках на русском: что ожидалось и что получено.

import { deepEqual, format } from './format.ts';

export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

type TestFn = () => unknown | Promise<unknown>;

interface TestCase {
  name: string;
  fn: TestFn;
  hooks: { before: TestFn[]; after: TestFn[] };
}

export interface CollectedTest {
  name: string;
  run: () => Promise<void>;
}

export interface MockFunction {
  (...args: unknown[]): unknown;
  mock: { calls: unknown[][]; results: unknown[] };
  mockReturnValue(value: unknown): MockFunction;
  mockImplementation(impl: (...args: unknown[]) => unknown): MockFunction;
  _isMockFunction: true;
}

export function createMockFn(impl?: (...args: unknown[]) => unknown): MockFunction {
  let implementation = impl;
  const mockFn = function (this: unknown, ...args: unknown[]) {
    mockFn.mock.calls.push(args);
    const result = implementation ? implementation.apply(this, args) : undefined;
    mockFn.mock.results.push(result);
    return result;
  } as MockFunction;
  mockFn.mock = { calls: [], results: [] };
  mockFn.mockReturnValue = (value) => {
    implementation = () => value;
    return mockFn;
  };
  mockFn.mockImplementation = (next) => {
    implementation = next;
    return mockFn;
  };
  mockFn._isMockFunction = true;
  return mockFn;
}

function isMock(value: unknown): value is MockFunction {
  return typeof value === 'function' && (value as Partial<MockFunction>)._isMockFunction === true;
}

function prefix(message: string | undefined): string {
  return message ? `${message}\n` : '';
}

function typeName(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'массив';
  return typeof value;
}

function getPath(obj: unknown, path: string | string[]): { found: boolean; value: unknown } {
  const parts = Array.isArray(path) ? path : path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(Object(current), part)) {
      return { found: false, value: undefined };
    }
    current = (current as Record<string, unknown>)[part];
  }
  return { found: true, value: current };
}

type Matchers = Record<string, (...args: any[]) => any>;

function buildMatchers(actual: unknown, negate: boolean, note: string | undefined): Matchers {
  const not = negate ? 'не ' : '';
  const check = (pass: boolean, message: () => string) => {
    if (pass === negate) throw new AssertionError(prefix(note) + message());
  };
  const expectedGot = (expected: string, got = format(actual)) =>
    `Ожидалось: ${not}${expected}\nПолучено:  ${got}`;

  return {
    toBe(expected: unknown) {
      check(Object.is(actual, expected), () => {
        const hint =
          !negate && typeof actual === 'object' && actual !== null && deepEqual(actual, expected)
            ? '\nЗначения совпадают по содержимому, но это разные объекты. Для сравнения содержимого используйте toEqual.'
            : '';
        return expectedGot(format(expected)) + hint;
      });
    },
    toEqual(expected: unknown) {
      check(deepEqual(actual, expected), () => expectedGot(format(expected)));
    },
    toStrictEqual(expected: unknown) {
      check(deepEqual(actual, expected, true), () => expectedGot(format(expected)));
    },
    toBeCloseTo(expected: number, digits = 2) {
      const pass = typeof actual === 'number' && Math.abs(expected - actual) < 10 ** -digits / 2;
      check(pass, () => expectedGot(`${expected} (с точностью до ${digits} знаков после запятой)`));
    },
    toBeTruthy() {
      check(Boolean(actual), () => expectedGot('истинное значение'));
    },
    toBeFalsy() {
      check(!actual, () => expectedGot('ложное значение (false, 0, "", null, undefined, NaN)'));
    },
    toBeNull() {
      check(actual === null, () => expectedGot('null'));
    },
    toBeUndefined() {
      check(actual === undefined, () => expectedGot('undefined'));
    },
    toBeDefined() {
      check(actual !== undefined, () => expectedGot('любое значение, кроме undefined'));
    },
    toBeNaN() {
      check(Number.isNaN(actual), () => expectedGot('NaN'));
    },
    toBeTypeOf(expected: string) {
      check(typeof actual === expected, () => expectedGot(`значение типа ${expected}`, `${format(actual)} (тип ${typeName(actual)})`));
    },
    toBeInstanceOf(expected: new (...args: any[]) => unknown) {
      check(actual instanceof expected, () => expectedGot(`экземпляр ${expected.name}`));
    },
    toBeGreaterThan(expected: number) {
      check((actual as number) > expected, () => expectedGot(`больше ${expected}`));
    },
    toBeGreaterThanOrEqual(expected: number) {
      check((actual as number) >= expected, () => expectedGot(`не меньше ${expected}`));
    },
    toBeLessThan(expected: number) {
      check((actual as number) < expected, () => expectedGot(`меньше ${expected}`));
    },
    toBeLessThanOrEqual(expected: number) {
      check((actual as number) <= expected, () => expectedGot(`не больше ${expected}`));
    },
    toContain(item: unknown) {
      const pass =
        typeof actual === 'string'
          ? actual.includes(String(item))
          : Array.isArray(actual) || actual instanceof Set
            ? [...actual].includes(item)
            : false;
      check(pass, () => expectedGot(`содержит ${format(item)}`));
    },
    toContainEqual(item: unknown) {
      const pass = Array.isArray(actual) && actual.some((x) => deepEqual(x, item));
      check(pass, () => expectedGot(`содержит элемент, равный ${format(item)}`));
    },
    toHaveLength(length: number) {
      const got = (actual as { length?: unknown } | null)?.length;
      check(got === length, () => expectedGot(`длина ${length}`, `длина ${format(got)} у ${format(actual)}`));
    },
    toHaveProperty(path: string | string[], ...rest: unknown[]) {
      const { found, value } = getPath(actual, path);
      const pathText = Array.isArray(path) ? path.join('.') : path;
      if (rest.length === 0) {
        check(found, () => expectedGot(`свойство «${pathText}»`));
      } else {
        check(found && deepEqual(value, rest[0]), () =>
          expectedGot(`свойство «${pathText}» со значением ${format(rest[0])}`, found ? format(value) : `свойства нет в ${format(actual)}`),
        );
      }
    },
    toMatch(pattern: RegExp | string) {
      const pass = typeof actual === 'string' && (typeof pattern === 'string' ? actual.includes(pattern) : pattern.test(actual));
      check(pass, () => expectedGot(`строка, подходящая под ${typeof pattern === 'string' ? format(pattern) : pattern}`));
    },
    toMatchObject(expected: Record<string, unknown>) {
      const matches = (a: unknown, e: unknown): boolean => {
        if (typeof e !== 'object' || e === null) return deepEqual(a, e);
        if (typeof a !== 'object' || a === null) return false;
        if (Array.isArray(e)) return Array.isArray(a) && a.length === e.length && e.every((x, i) => matches(a[i], x));
        return Object.keys(e).every((k) => matches((a as Record<string, unknown>)[k], (e as Record<string, unknown>)[k]));
      };
      check(matches(actual, expected), () => expectedGot(`объект, содержащий ${format(expected)}`));
    },
    toThrow(expected?: string | RegExp | (new (...args: any[]) => Error)) {
      if (typeof actual !== 'function') {
        throw new AssertionError(prefix(note) + 'toThrow ожидает функцию: expect(() => код).toThrow()');
      }
      let thrown: unknown;
      let didThrow = false;
      try {
        actual();
      } catch (error) {
        didThrow = true;
        thrown = error;
      }
      const message = thrown instanceof Error ? thrown.message : String(thrown);
      let pass = didThrow;
      let what = 'ошибка';
      if (didThrow && typeof expected === 'string') {
        pass = message.includes(expected);
        what = `ошибка с текстом ${format(expected)}`;
      } else if (didThrow && expected instanceof RegExp) {
        pass = expected.test(message);
        what = `ошибка с текстом, подходящим под ${expected}`;
      } else if (didThrow && typeof expected === 'function') {
        pass = thrown instanceof expected;
        what = `ошибка типа ${expected.name}`;
      }
      check(pass, () => expectedGot(what, didThrow ? `ошибка ${format(thrown)}` : 'функция выполнилась без ошибки'));
    },
    toHaveBeenCalled() {
      if (!isMock(actual)) throw new AssertionError(prefix(note) + 'Ожидалась мок-функция, созданная через fn()');
      check(actual.mock.calls.length > 0, () => expectedGot('хотя бы один вызов', `${actual.mock.calls.length} вызовов`));
    },
    toHaveBeenCalledTimes(times: number) {
      if (!isMock(actual)) throw new AssertionError(prefix(note) + 'Ожидалась мок-функция, созданная через fn()');
      check(actual.mock.calls.length === times, () => expectedGot(`${times} вызовов`, `${actual.mock.calls.length} вызовов`));
    },
    toHaveBeenCalledWith(...args: unknown[]) {
      if (!isMock(actual)) throw new AssertionError(prefix(note) + 'Ожидалась мок-функция, созданная через fn()');
      const pass = actual.mock.calls.some((call) => deepEqual(call, args));
      check(pass, () => expectedGot(`вызов с аргументами ${format(args)}`, `вызовы: ${format(actual.mock.calls)}`));
    },
  };
}

function wrapAsync(promiseLike: unknown, mode: 'resolves' | 'rejects', negate: boolean, note: string | undefined): Matchers {
  const proxy: Matchers = {};
  const names = Object.keys(buildMatchers(undefined, false, undefined));
  for (const name of names) {
    proxy[name] = async (...args: unknown[]) => {
      let value: unknown;
      try {
        value = await promiseLike;
        if (mode === 'rejects') {
          throw new AssertionError(prefix(note) + `Ожидалось, что промис завершится ошибкой, но он выполнился со значением ${format(value)}`);
        }
      } catch (error) {
        if (error instanceof AssertionError) throw error;
        if (mode === 'resolves') {
          throw new AssertionError(prefix(note) + `Ожидалось, что промис выполнится, но он завершился ошибкой ${format(error)}`);
        }
        value = error;
      }
      // rejects.toThrow() проверяет саму ошибку, как в Vitest.
      const subject = mode === 'rejects' && name === 'toThrow' ? () => { throw value; } : value;
      return buildMatchers(subject, negate, note)[name](...args);
    };
  }
  return proxy;
}

export function expect(actual: unknown, note?: string) {
  const matchers = buildMatchers(actual, false, note) as Matchers & {
    not: Matchers;
    resolves: Matchers & { not: Matchers };
    rejects: Matchers & { not: Matchers };
  };
  matchers.not = buildMatchers(actual, true, note);
  matchers.resolves = Object.assign(wrapAsync(actual, 'resolves', false, note), { not: wrapAsync(actual, 'resolves', true, note) });
  matchers.rejects = Object.assign(wrapAsync(actual, 'rejects', false, note), { not: wrapAsync(actual, 'rejects', true, note) });
  return matchers;
}

// Набор тестов одного запуска. Создаётся заново для каждого прогона.
export function createSuite() {
  const tests: TestCase[] = [];
  const stack: string[] = [];
  const hookStack: { before: TestFn[]; after: TestFn[] }[] = [{ before: [], after: [] }];

  const describe = (name: string, fn: () => void) => {
    stack.push(name);
    hookStack.push({ before: [], after: [] });
    try {
      fn();
    } finally {
      stack.pop();
      hookStack.pop();
    }
  };
  const it = (name: string, fn: TestFn) => {
    tests.push({
      name: [...stack, name].join(' › '),
      fn,
      hooks: {
        before: hookStack.flatMap((h) => h.before),
        after: hookStack.flatMap((h) => h.after).reverse(),
      },
    });
  };
  const beforeEach = (fn: TestFn) => hookStack[hookStack.length - 1].before.push(fn);
  const afterEach = (fn: TestFn) => hookStack[hookStack.length - 1].after.push(fn);

  const collect = (): CollectedTest[] =>
    tests.map((test) => ({
      name: test.name,
      run: async () => {
        try {
          for (const hook of test.hooks.before) await hook();
          await test.fn();
        } finally {
          for (const hook of test.hooks.after) await hook();
        }
      },
    }));

  return {
    globals: { describe, it, test: it, beforeEach, afterEach, expect, fn: createMockFn },
    collect,
  };
}
