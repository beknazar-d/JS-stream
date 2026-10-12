import { markPaid, applyDiscount } from './index.js';
import type { Order } from './index.js';

describe('markPaid: остальные поля', () => {
  it('сохраняет id, дату и сумму', () => {
    const order: Order = { id: 8, createdAt: '2025-03-02T09:30:00Z', status: 'new', total: 450 };
    expect(markPaid(order), 'Заказ после оплаты').toEqual({ id: 8, createdAt: '2025-03-02T09:30:00Z', status: 'paid', total: 450 });
  });
  it('возвращает другой объект', () => {
    const order: Order = { id: 8, createdAt: '2025-03-02T09:30:00Z', status: 'new', total: 450 };
    expect(markPaid(order) === order, 'Результат — копия, а не тот же объект').toBe(false);
  });
});

describe('applyDiscount: округление и границы', () => {
  it('округляет до целого', () => {
    const order: Order = { id: 9, createdAt: '2025-03-03T08:00:00Z', status: 'new', total: 999 };
    expect(applyDiscount(order, 15).total, '999 со скидкой 15%').toBe(849);
  });
  it('скидка 0 и 100 процентов', () => {
    const order: Order = { id: 9, createdAt: '2025-03-03T08:00:00Z', status: 'new', total: 500 };
    expect(applyDiscount(order, 0).total, 'Без скидки').toBe(500);
    expect(applyDiscount(order, 100).total, 'Скидка 100%').toBe(0);
  });
  it('исходный объект и поля не меняются', () => {
    const order: Order = { id: 9, createdAt: '2025-03-03T08:00:00Z', status: 'new', total: 500 };
    const result = applyDiscount(order, 20);
    expect(order, 'Исходный заказ').toEqual({ id: 9, createdAt: '2025-03-03T08:00:00Z', status: 'new', total: 500 });
    expect(result.id, 'id сохранён').toBe(9);
    expect(result.status, 'статус сохранён').toBe('new');
  });
});
