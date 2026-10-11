// Форматирование значений для сообщений тестов и сравнение по значению.
// Работает и в Node, и в Web Worker: без зависимостей от окружения.

const MAX_DEPTH = 4;
const MAX_ITEMS = 20;

export function format(value: unknown, depth = 0, seen: Set<unknown> = new Set()): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);
    case 'number':
      if (Object.is(value, -0)) return '-0';
      return String(value);
    case 'bigint':
      return `${value}n`;
    case 'boolean':
      return String(value);
    case 'symbol':
      return value.toString();
    case 'function':
      return value.name ? `[функция ${value.name}]` : '[функция]';
  }
  if (seen.has(value)) return '[циклическая ссылка]';
  if (depth >= MAX_DEPTH) return Array.isArray(value) ? '[…]' : '{…}';
  seen.add(value);
  try {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? 'Invalid Date' : `Date(${value.toISOString()})`;
    }
    if (value instanceof RegExp) return value.toString();
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (Array.isArray(value)) {
      const items = value.slice(0, MAX_ITEMS).map((item) => format(item, depth + 1, seen));
      if (value.length > MAX_ITEMS) items.push(`… ещё ${value.length - MAX_ITEMS}`);
      return `[${items.join(', ')}]`;
    }
    if (value instanceof Map) {
      const items = [...value.entries()]
        .slice(0, MAX_ITEMS)
        .map(([k, v]) => `${format(k, depth + 1, seen)} => ${format(v, depth + 1, seen)}`);
      return `Map(${value.size}) {${items.join(', ')}}`;
    }
    if (value instanceof Set) {
      const items = [...value].slice(0, MAX_ITEMS).map((v) => format(v, depth + 1, seen));
      return `Set(${value.size}) {${items.join(', ')}}`;
    }
    if (value instanceof Promise) return 'Promise {…}';
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    const items = keys
      .slice(0, MAX_ITEMS)
      .map((key) => `${/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)}: ${format(obj[key], depth + 1, seen)}`);
    if (keys.length > MAX_ITEMS) items.push(`… ещё ${keys.length - MAX_ITEMS}`);
    const proto = Object.getPrototypeOf(value);
    const name = proto && proto !== Object.prototype && proto.constructor ? `${proto.constructor.name} ` : '';
    return items.length ? `${name}{ ${items.join(', ')} }` : `${name}{}`;
  } finally {
    seen.delete(value);
  }
}

// Сравнение по значению. strict = true дополнительно сравнивает прототипы,
// разреженные массивы и свойства со значением undefined (как toStrictEqual).
export function deepEqual(a: unknown, b: unknown, strict = false, seen = new Map<unknown, unknown>()): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);

  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && Object.is(a.getTime(), b.getTime());
  }
  if (a instanceof RegExp || b instanceof RegExp) {
    return a instanceof RegExp && b instanceof RegExp && a.toString() === b.toString();
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map && b instanceof Map) || a.size !== b.size) return false;
    for (const [key, value] of a) {
      if (!b.has(key) || !deepEqual(value, b.get(key), strict, seen)) return false;
    }
    return true;
  }
  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set && b instanceof Set) || a.size !== b.size) return false;
    outer: for (const value of a) {
      if (b.has(value)) continue;
      for (const other of b) if (deepEqual(value, other, strict, seen)) continue outer;
      return false;
    }
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) return false;

  const ra = a as Record<string, unknown>;
  const rb = b as Record<string, unknown>;
  const keysA = Object.keys(ra).filter((k) => strict || ra[k] !== undefined);
  const keysB = Object.keys(rb).filter((k) => strict || rb[k] !== undefined);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(rb, key)) return false;
    if (!deepEqual(ra[key], rb[key], strict, seen)) return false;
  }
  return true;
}
