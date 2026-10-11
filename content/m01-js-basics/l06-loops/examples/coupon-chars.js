// Проверка кода купона по символам: считаем цифры и ищем первый дефис.
const code = "SALE-2025-A7";
let digits = 0;
let dashAt = -1;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  if (char === "-" && dashAt === -1) {
    dashAt = i;
  }
  if ("0123456789".includes(char)) {
    digits++;
  }
}

console.log(`Длина кода: ${code.length}`);
console.log(`Первый дефис на позиции ${dashAt}`);
console.log(`Цифр в коде: ${digits}`);
