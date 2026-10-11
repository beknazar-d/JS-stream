// Обычное объявление и две стрелочные записи одной и той же функции.
function vatClassic(price) {
  return price * 1.2;
}

const vatArrow = (price) => {
  return price * 1.2;
};

const vatShort = (price) => price * 1.2;

console.log(vatClassic(500));
console.log(vatArrow(500));
console.log(vatShort(500));

// Несколько параметров и ни одного.
const sum = (a, b) => a + b;
const freeShipping = () => 0;
console.log(sum(1200, 350));
console.log(freeShipping());

// Ловушка: фигурные скобки без return.
const broken = (price) => {
  price * 1.2;
};
console.log(broken(500));
