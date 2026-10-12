import type { Order, OrderPatch, OrderStatus } from './index.js';
import { updateOrder } from './index.js';

declare const order: Order;

type cases = [
  Expect<Equal<OrderPatch, { status?: OrderStatus; city?: string; total?: number }>>,
  Expect<Equal<ReturnType<typeof updateOrder>, Order>>,
];

updateOrder(order, { status: 'paid' });
updateOrder(order, {});

// @ts-expect-error id менять нельзя
updateOrder(order, { id: 5 });

// @ts-expect-error неизвестный статус (пробел в конце)
updateOrder(order, { status: 'delivered ' });
