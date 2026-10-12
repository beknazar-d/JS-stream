import { applyPatch, createOrder, type Order, type OrderPatch } from './index.js';

declare const order: Order;

// Допустимые патчи.
applyPatch(order, { status: 'shipped' });
applyPatch(order, { city: 'Омск', total: 10 });
applyPatch(order, {});

// @ts-expect-error id менять нельзя
applyPatch(order, { id: 5 });

// @ts-expect-error дату создания менять нельзя
applyPatch(order, { createdAt: '2025-01-01T00:00:00Z' });

// @ts-expect-error неизвестного статуса не существует
applyPatch(order, { status: 'lost' });

// @ts-expect-error форма создания не принимает id
createOrder({ id: 1, status: 'new', city: 'Омск', total: 1, items: [] }, 1, '2025-01-01T00:00:00Z');

// @ts-expect-error в форме создания обязательны все поля, кроме id и даты
createOrder({ status: 'new', city: 'Омск' }, 1, '2025-01-01T00:00:00Z');

type cases = [
  Expect<Equal<keyof OrderPatch, 'status' | 'city' | 'total' | 'items'>>,
];
