import { applyPatch, createOrder, previewOf, type Order } from './index.js';

const order: Order = { id: 1001, createdAt: '2025-03-01T10:00:00Z', status: 'new', city: 'Казань', total: 4200, items: ['TV-1'] };

describe('виды заказа', () => {
  it('превью содержит только id и status', () => {
    expect(previewOf(order), 'Превью заказа').toStrictEqual({ id: 1001, status: 'new' });
  });

  it('форма создания не знает про id и дату', () => {
    const created = createOrder({ status: 'new', city: 'Омск', total: 900, items: ['KB-2'] }, 7, '2025-03-02T09:00:00Z');
    expect(created, 'Созданный заказ').toEqual({ id: 7, createdAt: '2025-03-02T09:00:00Z', status: 'new', city: 'Омск', total: 900, items: ['KB-2'] });
  });

  it('патч меняет только указанные поля', () => {
    expect(applyPatch(order, { status: 'paid' }), 'Патч статуса').toEqual({ ...order, status: 'paid' });
  });
});
