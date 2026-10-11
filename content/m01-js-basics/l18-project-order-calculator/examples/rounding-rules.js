// Правило округления входит в ТЗ: два способа дают разные копейки.
const lines = [
  { price: 1, qty: 10 },
  { price: 1, qty: 10 },
];

// Способ 1: округляем скидку каждой позиции отдельно.
const perLine = lines.reduce((sum, line) => sum + Math.round((line.price * line.qty * 5) / 100), 0);

// Способ 2: считаем по сумме и округляем один раз.
const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
const once = Math.round((total * 5) / 100);

console.log(perLine);
console.log(once);

// Дробные рубли дают хвосты, целые копейки нет.
console.log(4.35 * 100);
console.log(Math.round(4.35 * 100));
