// Артикул, введённый кладовщиком, и артикул в базе.
const typed = " rn-4521-blk ";
const stored = "RN-4521-BLK";

console.log(typed === stored);
console.log(typed.length);

const cleaned = typed.trim().toUpperCase();
console.log(cleaned);
console.log(cleaned === stored);

// Исходная строка не изменилась.
console.log(typed.length);
