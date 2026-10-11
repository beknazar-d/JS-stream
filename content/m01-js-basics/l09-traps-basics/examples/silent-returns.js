// Функция считает, но возвращает undefined. Консоль молчит.

// 1. return, после которого перенос строки.
function lineTotal(price, quantity) {
  return
    price * quantity;
}

// 2. Стрелка с фигурными скобками без return.
const lineTotalArrow = (price, quantity) => {
  price * quantity;
};

// 3. Правильный вариант: выражение сразу после return.
function lineTotalFixed(price, quantity) {
  return price * quantity;
}

console.log(lineTotal(100, 3));
console.log(lineTotalArrow(100, 3));
console.log(lineTotalFixed(100, 3));
