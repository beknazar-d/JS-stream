// Поля формы: ноль и пустая строка — это значения, а не «ничего».
const discountFromForm = 0;
const noteFromForm = "";
const missing = undefined;

console.log(discountFromForm || 5);
console.log(discountFromForm ?? 5);
console.log(`[${noteFromForm || "без заметки"}]`);
console.log(`[${noteFromForm ?? "без заметки"}]`);
console.log(missing || 5);
console.log(missing ?? 5);
