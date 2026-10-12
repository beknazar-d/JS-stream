// Фабрика функций: каждый вызов makeCounter создаёт свой счётчик.
function makeCounter(prefix) {
  let last = 0;
  return function next() {
    last = last + 1;
    return prefix + "-" + last;
  };
}

const nextOrder = makeCounter("ORD");
const nextReturn = makeCounter("RET");

console.log(nextOrder());
console.log(nextOrder());
console.log(nextReturn());
console.log(nextOrder());
