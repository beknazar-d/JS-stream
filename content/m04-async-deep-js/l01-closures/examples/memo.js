// Кэш в замыкании: дорогой расчёт выполняется один раз на каждый аргумент.
let calls = 0;

function deliveryFee(zone) {
  calls = calls + 1;
  return zone * 150;
}

function memoize(fn) {
  const cache = new Map();
  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const fastFee = memoize(deliveryFee);
console.log(fastFee(2));
console.log(fastFee(2));
console.log(fastFee(3));
console.log(calls);
