const orders = [
  { id: "A-101", status: "paid", total: 4500 },
  { id: "A-102", status: "new", total: 900 },
  { id: "A-103", status: "paid", total: 1200 },
  { id: "A-104", status: "cancelled", total: 3000 },
];

// map: из каждого заказа получаем одно значение.
const ids = orders.map((order) => order.id);
console.log(ids);

// filter: оставляем только подходящие заказы.
const paid = orders.filter((order) => order.status === "paid");
console.log(paid);

// Исходный массив остался прежним.
console.log(orders.length);
