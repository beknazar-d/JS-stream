export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  createdAt: string;
  status: OrderStatus;
  city: string;
  total: number;
  items: string[];
}

// DEV-601: три вида заказа.
export type OrderPreview = Pick<Order, 'id' | 'status'>;
export type NewOrder = Omit<Order, 'id' | 'createdAt'>;
export type OrderPatch = Partial<NewOrder>;

export function previewOf(order: Order): OrderPreview {
  return { id: order.id, status: order.status };
}

export function createOrder(input: NewOrder, id: number, createdAt: string): Order {
  return { ...input, id, createdAt };
}

export function applyPatch(order: Order, patch: OrderPatch): Order {
  return { ...order, ...patch };
}
