// Упрощённая цепочка расчёта из проекта в одном файле.
// В проекте каждый шаг лежит в своём модуле.
const cart = [
  { sku: 'A-100', name: 'Кофе зерновой 1 кг', price: 119900, qty: 2 },
  { sku: 'F-10', name: 'Фильтры', price: 30000, qty: 1 },
];

const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
const promo = Math.round(subtotal / 10); // SALE10
const goods = subtotal - promo;
const delivery = goods >= 300000 ? 0 : 29900;
const total = goods + delivery;
const vat = Math.round((total * 20) / 120);

console.log(subtotal);
console.log(promo);
console.log(goods);
console.log(delivery);
console.log(total);
console.log(vat);
