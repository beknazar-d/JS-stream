function makeCounter(step) {
  let value = 0;
  return function () {
    value = value + step;
    return value;
  };
}

const byOne = makeCounter(1);
const byTen = makeCounter(10);

console.log(byOne());
console.log(byOne());
console.log(byTen());
console.log(byOne() + byTen());
const alias = byOne;
console.log(alias());
console.log(makeCounter(1)());
