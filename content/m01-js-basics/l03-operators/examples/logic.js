const orderSum = 5000;
const isMember = false;

console.log(orderSum > 5000);
console.log(orderSum >= 5000);
console.log(orderSum >= 5000 && isMember);
console.log(orderSum >= 5000 || isMember);
console.log(!isMember);

// Результат && и || это одна из частей, а не обязательно true или false.
console.log(0 || 10);
console.log("" || "Без названия");
console.log("A-100" && "найден");

// Короткое вычисление: правая часть не выполняется.
let checks = 0;
const result = true || ++checks;
console.log(result);
console.log(checks);
