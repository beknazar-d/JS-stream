// Если второй аргумент не передали, берётся значение по умолчанию.
function priceWithVat(price, rate = 0.2) {
  return price * (1 + rate);
}

// Здесь забыли return: результат посчитан и потерян.
function priceWithoutReturn(price) {
  price * 1.2;
}

console.log(priceWithVat(500));
console.log(priceWithVat(500, 0.1));
console.log(priceWithVat(500, 0));
console.log(priceWithoutReturn(500));
