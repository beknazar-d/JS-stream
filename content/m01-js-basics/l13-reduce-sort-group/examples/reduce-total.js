const cart = [
  { name: "Кроссовки", price: 4500, quantity: 1 },
  { name: "Носки", price: 300, quantity: 3 },
  { name: "Кепка", price: 1200, quantity: 2 },
];

// reduce: acc — промежуточный итог, 0 — начальное значение.
const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
console.log(total);

const units = cart.reduce((acc, item) => acc + item.quantity, 0);
console.log(units);

// Пустая корзина с начальным значением даёт 0, а не ошибку.
console.log([].reduce((acc, item) => acc + item.price, 0));

// Счётчик: acc может быть и объектом.
const names = ["paid", "new", "paid", "paid", "new"];
const counts = names.reduce((acc, status) => {
  acc[status] = (acc[status] ?? 0) + 1;
  return acc;
}, {});
console.log(counts);
