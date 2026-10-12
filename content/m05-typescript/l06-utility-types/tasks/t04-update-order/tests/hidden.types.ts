import type { Order } from './index.js';
import { updateOrder } from './index.js';

declare const order: Order;

// @ts-expect-error опечатка в названии поля
updateOrder(order, { adress: 'Омск' });

// @ts-expect-error сумма должна быть числом
updateOrder(order, { total: '100' });

// Допустимые сочетания полей.
updateOrder(order, { status: 'shipped', city: 'Омск', total: 1 });
updateOrder(order, { city: 'Омск' });
