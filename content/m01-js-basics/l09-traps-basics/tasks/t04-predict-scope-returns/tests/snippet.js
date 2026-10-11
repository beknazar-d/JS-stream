const rate = 0.2;

function priceWithMargin(price) {
  const rate = 0.5;
  return price * (1 + rate);
}
console.log(priceWithMargin(1000));
console.log(rate);

function lineTotal(price, quantity) {
  return
    price * quantity;
}
console.log(lineTotal(100, 3));

const lineTotalArrow = (price, quantity) => {
  price * quantity;
};
const lineTotalShort = (price, quantity) => price * quantity;
console.log(lineTotalArrow(100, 3));
console.log(lineTotalShort(100, 3));

let count = 1;
{
  let count = 2;
  count = count + 1;
}
console.log(count);

let status = "новый";
function changeStatus(status) {
  status = "отправлен";
}
changeStatus(status);
console.log(status);

const makeAdder = (step) => (value) => value + step;
const addTen = makeAdder(10);
console.log(addTen(5));
