export interface Order {
  readonly id: number;
  readonly createdAt: string;
  readonly status: string;
  readonly total: number;
}

export function markPaid(order: Order): Order {
  Object.assign(order, { status: "paid" });
  return order;
}

export function applyDiscount(order: Order, percent: number): Order {
  Object.assign(order, { total: Math.round((order.total * (100 - percent)) / 100) });
  return order;
}
