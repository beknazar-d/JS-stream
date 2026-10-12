// У параметра типа может быть значение по умолчанию.
interface Page<T = string> {
  items: T[];
  total: number;
}

function toPage<T>(items: T[]): Page<T> {
  return { items, total: items.length };
}

const cities: Page = { items: ["Казань", "Омск"], total: 2 };
const stock: Page<number> = toPage([14, 0, 3]);

console.log(cities.total);
console.log(stock.items);
console.log(toPage([{ sku: "TV-1" }]));
