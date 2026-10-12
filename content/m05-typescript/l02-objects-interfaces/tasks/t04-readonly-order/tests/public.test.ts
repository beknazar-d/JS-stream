import { markPaid, applyDiscount } from './index.js';
import type { Order } from './index.js';

const order: Order = { id: 7, createdAt: '2025-03-01T10:00:00Z', status: 'new', total: 1000 };

describe('markPaid', () => {
  it('возвращает оплаченный заказ', () => {
    expect(markPaid(order).status, 'Статус после оплаты').toBe('paid');
  });
  it('не меняет исходный заказ', () => {
    markPaid(order);
    expect(order.status, 'Исходный статус').toBe('new');
  });
});

describe('applyDiscount', () => {
  it('скидка 10 процентов', () => {
    expect(applyDiscount(order, 10).total, 'Сумма со скидкой 10%').toBe(900);
  });
  it('не меняет исходный заказ', () => {
    applyDiscount(order, 10);
    expect(order.total, 'Исходная сумма').toBe(1000);
  });
});
