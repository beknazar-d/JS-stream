export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  createdAt: string;
  status: OrderStatus;
  city: string;
  total: number;
  items: string[];
}

// DEV-601: три вида заказа. Сейчас все они просто Order.
export type OrderPreview = Order;
export type NewOrder = Order;
export type OrderPatch = Order;

export function previewOf(order: Order): OrderPreview {
  return order;
}

export function createOrder(input: NewOrder, id: number, createdAt: string): Order {
  return { ...input, id, createdAt };
}

export function applyPatch(order: Order, patch: OrderPatch): Order {
  return { ...order, ...patch };
}
