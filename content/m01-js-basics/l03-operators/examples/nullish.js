// Скидка 0 процентов законна. Скидка не задана: undefined или null.
const zero = 0;
const missing = undefined;
const empty = null;

console.log(zero || 10);
console.log(zero ?? 10);
console.log(missing ?? 10);
console.log(empty ?? 10);
console.log("" ?? "нет описания");
console.log("" || "нет описания");

// Скобки делают порядок явным.
console.log((null || 5) ?? 3);
console.log(2 + 3 * 4 ** 2);
console.log((2 + 3) * 4);
