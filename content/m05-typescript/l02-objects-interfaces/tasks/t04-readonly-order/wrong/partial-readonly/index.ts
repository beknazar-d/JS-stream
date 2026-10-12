export interface Order {
  readonly id: number;
  readonly createdAt: string;
  status: string;
  total: number;
}

export function markPaid(order: Order): Order {
  order.status = "paid";
  return order;
}

export function applyDiscount(order: Order, percent: number): Order {
  order.total = Math.round((order.total * (100 - percent)) / 100);
  return order;
}
