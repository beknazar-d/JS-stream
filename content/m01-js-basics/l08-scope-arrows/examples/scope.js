const shopName = "Лавка";

// Функция видит переменные снаружи, но свои переменные снаружи не видны.
function makeLabel(product) {
  const prefix = "Товар";
  return `${shopName}: ${prefix} «${product}»`;
}
console.log(makeLabel("Чайник"));

// Переменная в фигурных скобках блока живёт только в этом блоке.
const stock = 10;
if (stock > 0) {
  const message = "Есть в наличии";
  console.log(message);
}

// Затенение: внутренняя переменная закрывает внешнюю с тем же именем.
const discount = 10;
function priceFor(amount) {
  const discount = 25;
  return amount - (amount * discount) / 100;
}
console.log(priceFor(1000));
console.log(discount);
