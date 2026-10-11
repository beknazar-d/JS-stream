// Количество из поля формы всегда приходит строкой.
const quantityFromForm = "12";
const added = 3;

const wrong = quantityFromForm + added;
console.log(wrong);
console.log(typeof wrong);

const right = Number(quantityFromForm) + added;
console.log(right);
