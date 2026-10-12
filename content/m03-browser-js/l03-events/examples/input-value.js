// Поле ввода отдаёт строку. Количество нужно превратить в число и ограничить.
function parseQty(value, min, max) {
  const number = Math.trunc(Number(value));
  if (Number.isNaN(number) || number < min) return min;
  if (number > max) return max;
  return number;
}

console.log(parseQty('3', 1, 99));
console.log(parseQty('', 1, 99));
console.log(parseQty('abc', 1, 99));
console.log(parseQty('150', 1, 99));
console.log(parseQty('2.7', 1, 99));
console.log('5' + 1);
console.log(Number('5') + 1);
