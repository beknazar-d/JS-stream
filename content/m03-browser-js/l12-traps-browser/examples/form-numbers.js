// Всё, что приходит из поля формы, — строка.
console.log('"3" + 1 =', '3' + 1);
console.log('"3" * 2 =', '3' * 2);
console.log('Number("") =', Number(''));
console.log('Number("abc") =', Number('abc'));

// Безопасное чтение количества: целое число от 1, иначе null.
function parseQuantity(text) {
  const clean = text.trim();
  if (clean === '') return null;
  const value = Number(clean);
  if (!Number.isInteger(value) || value < 1) return null;
  return value;
}

for (const input of ['3', ' 4 ', '', 'abc', '2.5', '0', '-1']) {
  console.log(JSON.stringify(input), '->', parseQuantity(input));
}
