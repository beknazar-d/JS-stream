export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  status: OrderStatus;
  city: string;
  total: number;
}

// BUG-3220: патч принимает всё подряд.
export type OrderPatch = any;

export function updateOrder(order: Order, patch: OrderPatch): Order {
  Object.assign(order, patch);
  return order;
}
