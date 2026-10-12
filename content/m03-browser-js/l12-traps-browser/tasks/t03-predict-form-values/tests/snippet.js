const field = { value: '' };
const price = 2490;

console.log(field.value * price);
console.log(Number(field.value));

field.value = '3';
console.log(field.value + 1);
console.log(field.value * price);

field.value = '2 шт';
console.log(Number(field.value) * price);
console.log(Number.isNaN(parseInt(field.value)));
