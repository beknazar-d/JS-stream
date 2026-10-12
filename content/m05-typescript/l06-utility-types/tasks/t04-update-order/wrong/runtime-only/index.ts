export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  status: OrderStatus;
  city: string;
  total: number;
}

export type OrderPatch = any;

export function updateOrder(order: Order, patch: OrderPatch): Order {
  return {
    id: order.id,
    status: patch.status ?? order.status,
    city: patch.city ?? order.city,
    total: patch.total ?? order.total,
  };
}
