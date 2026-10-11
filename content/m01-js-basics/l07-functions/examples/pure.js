// Чистая функция: результат зависит только от аргументов, ничего снаружи не меняется.
function discounted(price, percent) {
  return price - (price * percent) / 100;
}

// Функция с побочным эффектом: меняет переменную снаружи.
let ordersToday = 0;
function registerOrder() {
  ordersToday = ordersToday + 1;
  return ordersToday;
}

console.log(discounted(2000, 10));
console.log(discounted(2000, 10));

console.log(registerOrder());
console.log(registerOrder());
console.log(`Заказов сегодня: ${ordersToday}`);
