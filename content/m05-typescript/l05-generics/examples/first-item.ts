interface Order {
  id: number;
  city: string;
}

// T — «параметр типа»: что придёт в items, то и вернётся.
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const orders: Order[] = [
  { id: 1001, city: "Казань" },
  { id: 1002, city: "Омск" },
];
const couriers = ["Анна", "Борис"];

const firstOrder = firstItem(orders);
const firstCourier = firstItem(couriers);

console.log(firstOrder?.city);
console.log(firstCourier?.toUpperCase());
console.log(firstItem([]));
