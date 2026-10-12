type OrderStatus = "new" | "paid" | "shipped";

interface Order {
  id: number;
  status: OrderStatus;
  city: string;
  total: number;
}

// Все поля необязательные, кроме id: его менять нельзя.
type OrderPatch = Partial<Omit<Order, "id">>;

function applyPatch(order: Order, patch: OrderPatch): Order {
  return { ...order, ...patch };
}

const order: Order = { id: 1001, status: "new", city: "Казань", total: 4200 };

console.log(applyPatch(order, { status: "paid" }));
console.log(applyPatch(order, { city: "Омск", total: 3900 }));
console.log(order.status);
