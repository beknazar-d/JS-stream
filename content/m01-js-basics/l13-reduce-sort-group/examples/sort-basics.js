// Сортировка по умолчанию сравнивает элементы как строки.
console.log([10, 9, 1].sort());

// Компаратор (a, b) => a - b сравнивает как числа.
console.log([10, 9, 1].sort((a, b) => a - b));
console.log([10, 9, 1].sort((a, b) => b - a));

// sort меняет исходный массив, toSorted возвращает копию.
const totals = [900, 4500, 1200];
const sorted = totals.toSorted((a, b) => a - b);
console.log(sorted);
console.log(totals);

totals.sort((a, b) => a - b);
console.log(totals);

// Объекты сортируют по полю, строки сравнивают через localeCompare.
const products = [
  { name: "Шарф", price: 900 },
  { name: "Кепка", price: 1200 },
  { name: "Носки", price: 300 },
];
console.log(products.toSorted((a, b) => a.price - b.price).map((item) => item.name));
console.log(products.toSorted((a, b) => a.name.localeCompare(b.name, "ru")).map((item) => item.name));
