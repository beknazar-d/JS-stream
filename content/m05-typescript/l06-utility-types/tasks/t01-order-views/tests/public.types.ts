import type { OrderPreview, NewOrder, OrderPatch, OrderStatus } from './index.js';

type cases = [
  Expect<Equal<OrderPreview, { id: number; status: OrderStatus }>>,
  Expect<Equal<NewOrder, { status: OrderStatus; city: string; total: number; items: string[] }>>,
  Expect<Equal<OrderPatch, { status?: OrderStatus; city?: string; total?: number; items?: string[] }>>,
];
