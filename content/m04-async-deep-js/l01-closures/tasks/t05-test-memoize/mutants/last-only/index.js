export function memoize(fn) {
  let lastArg;
  let lastResult;
  let hasLast = false;
  return function (arg) {
    if (hasLast && lastArg === arg) {
      return lastResult;
    }
    lastResult = fn(arg);
    lastArg = arg;
    hasLast = true;
    return lastResult;
  };
}
