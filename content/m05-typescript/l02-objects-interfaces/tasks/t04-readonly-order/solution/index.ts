export interface Order {
  readonly id: number;
  readonly createdAt: string;
  readonly status: string;
  readonly total: number;
}

export function markPaid(order: Order): Order {
  return { ...order, status: "paid" };
}

export function applyDiscount(order: Order, percent: number): Order {
  return { ...order, total: Math.round((order.total * (100 - percent)) / 100) };
}
