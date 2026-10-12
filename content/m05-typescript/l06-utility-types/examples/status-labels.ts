type DeliveryStatus = "created" | "packed" | "onTheWay" | "delivered";

// Record требует ровно по одному значению на каждый статус.
const labels: Record<DeliveryStatus, string> = {
  created: "Создан",
  packed: "Собран",
  onTheWay: "В пути",
  delivered: "Доставлен",
};

const statuses: DeliveryStatus[] = ["packed", "delivered"];
for (const status of statuses) {
  console.log(status, "->", labels[status]);
}

// Счётчики: тот же приём, но значения числа.
const counters: Record<DeliveryStatus, number> = { created: 0, packed: 0, onTheWay: 0, delivered: 0 };
counters.packed += 1;
console.log(counters);
