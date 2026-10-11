import { orderLabel, splitQueue } from './index.js';

describe('orderLabel', () => {
  it('собирает подпись из номера, имени и города', () => {
    const order = { id: 1042, customer: { name: 'Анна Ким', city: 'Казань' } };
    expect(orderLabel(order), 'Заказ с городом').toBe('Заказ 1042: Анна Ким, Казань');
  });
});

describe('splitQueue', () => {
  it('отделяет первый заказ от остальных', () => {
    expect(splitQueue([1001, 1002, 1003]), 'Очередь из трёх заказов').toEqual({ next: 1001, waiting: [1002, 1003] });
  });
});
