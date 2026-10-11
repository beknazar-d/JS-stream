const orders = [
  { id: "A-101", status: "paid", total: 4500 },
  { id: "A-102", status: "new", total: 900 },
  { id: "A-103", status: "paid", total: 1200 },
];

// find: первый подходящий элемент или undefined.
console.log(orders.find((order) => order.id === "A-103"));
console.log(orders.find((order) => order.id === "A-999"));

// findIndex: индекс первого подходящего или -1.
console.log(orders.findIndex((order) => order.status === "new"));

// some: есть ли хотя бы один? every: подходят ли все?
console.log(orders.some((order) => order.total > 4000));
console.log(orders.every((order) => order.status === "paid"));

// На пустом массиве some даёт false, а every даёт true.
console.log([].some((order) => order.total > 0));
console.log([].every((order) => order.total > 0));
