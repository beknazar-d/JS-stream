export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  status: OrderStatus;
  city: string;
  total: number;
}

export type OrderPatch = Partial<Omit<Order, 'id'>>;

export function updateOrder(order: Order, patch: OrderPatch): Order {
  return { ...order, ...patch };
}
