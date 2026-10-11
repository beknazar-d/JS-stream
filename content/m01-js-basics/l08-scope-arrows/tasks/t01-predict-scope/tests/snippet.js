const discount = 10;

function priceFor(amount) {
  const discount = 25;
  return amount - (amount * discount) / 100;
}
console.log(priceFor(1000));
console.log(discount);

let stock = 5;
if (stock > 0) {
  let stock = 100;
  stock = stock - 1;
  console.log(stock);
}
console.log(stock);

const makeCounter = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
};
const a = makeCounter();
const b = makeCounter();
console.log(a());
console.log(a());
console.log(b());

const broken = (x) => {
  x * 2;
};
const works = (x) => x * 2;
console.log(broken(4));
console.log(works(4));
