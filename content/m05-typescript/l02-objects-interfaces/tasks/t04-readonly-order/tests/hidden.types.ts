import type { Order } from './index.js';

declare const order: Order;

// @ts-expect-error номер заказа менять нельзя
order.id = 1;

// @ts-expect-error дату создания менять нельзя
order.createdAt = "2025-01-01T00:00:00Z";

// @ts-expect-error статус меняют только через новый объект
order.status = "paid";

// @ts-expect-error сумму меняют только через новый объект
order.total = 0;
