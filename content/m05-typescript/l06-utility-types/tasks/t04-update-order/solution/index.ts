export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  status: OrderStatus;
  city: string;
  total: number;
}

// BUG-3220: менять можно статус, город и сумму; id — нельзя.
export type OrderPatch = Partial<Omit<Order, 'id'>>;

export function updateOrder(order: Order, patch: OrderPatch): Order {
  return {
    id: order.id,
    status: patch.status ?? order.status,
    city: patch.city ?? order.city,
    total: patch.total ?? order.total,
  };
}
