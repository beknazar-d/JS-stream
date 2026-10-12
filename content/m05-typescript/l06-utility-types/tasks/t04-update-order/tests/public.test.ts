import { updateOrder, type Order } from './index.js';

const order: Order = { id: 1001, status: 'new', city: 'Казань', total: 4200 };

describe('updateOrder', () => {
  it('применяет патч', () => {
    expect(updateOrder(order, { status: 'paid' }), 'Патч статуса').toEqual({ id: 1001, status: 'paid', city: 'Казань', total: 4200 });
    expect(updateOrder(order, { city: 'Омск', total: 3900 }), 'Патч города и суммы').toEqual({ id: 1001, status: 'new', city: 'Омск', total: 3900 });
  });

  it('не меняет исходный заказ', () => {
    updateOrder(order, { status: 'shipped', city: 'Тверь' });
    expect(order, 'Исходный заказ после вызова').toEqual({ id: 1001, status: 'new', city: 'Казань', total: 4200 });
  });

  it('возвращает новый объект', () => {
    expect(updateOrder(order, {}), 'Пустой патч возвращает копию').not.toBe(order);
    expect(updateOrder(order, {}), 'Содержимое копии').toEqual(order);
  });
});
