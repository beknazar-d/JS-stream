// Заказ — это объект: поля с именами.
const order = {
  id: "A-101",
  status: "new",
  total: 4500,
  customer: {
    name: "Ирина",
    address: { city: "Казань", street: "Баумана, 12" },
  },
};

console.log(order.status);
console.log(order["total"]);

// Записать и добавить поле.
order.status = "paid";
order.paidAt = "2026-03-01";
console.log(order.status);
console.log(order.paidAt);

// Вложенные данные читаем цепочкой.
console.log(order.customer.address.city);

// Поля нет: undefined. Безопасное чтение через ?.
console.log(order.customer.phone);
console.log(order.customer.phone?.number);
console.log(order.giftCard?.code ?? "без подарочной карты");
