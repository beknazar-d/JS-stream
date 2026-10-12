export function memoize(fn) {
  const cache = new Map();
  return function (arg) {
    const cached = cache.get(arg);
    if (cached) {
      return cached;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
