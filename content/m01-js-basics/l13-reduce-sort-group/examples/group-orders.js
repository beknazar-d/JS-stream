const orders = [
  { id: "A-101", status: "paid", total: 4500 },
  { id: "A-102", status: "new", total: 900 },
  { id: "A-103", status: "paid", total: 1200 },
  { id: "A-104", status: "new", total: 300 },
];

// Группировка через reduce: ключ — статус, значение — массив заказов.
const byStatus = orders.reduce((groups, order) => {
  if (!Object.hasOwn(groups, order.status)) {
    groups[order.status] = [];
  }
  groups[order.status].push(order.id);
  return groups;
}, {});
console.log(byStatus);

// Итоги по группам.
const totals = {};
for (const order of orders) {
  totals[order.status] = (totals[order.status] ?? 0) + order.total;
}
console.log(totals);
