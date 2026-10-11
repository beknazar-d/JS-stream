const products = [
  { name: "Кроссовки", price: 4500, quantity: 3 },
  { name: "Носки", price: 300, quantity: 0 },
  { name: "Кепка", price: 1200, quantity: 8 },
  { name: "Шарф", price: 900, quantity: 2 },
];

// Цепочка: сначала отбираем, потом превращаем.
const labels = products
  .filter((product) => product.quantity > 0)
  .filter((product) => product.price < 2000)
  .map((product) => product.name + ": " + product.price + " ₽");

console.log(labels);
console.log(products.length);
