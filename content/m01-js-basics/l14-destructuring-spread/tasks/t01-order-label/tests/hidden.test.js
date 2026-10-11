import { orderLabel, splitQueue } from './index.js';

describe('orderLabel: краевые случаи', () => {
  it('без города пишет «не указан»', () => {
    const order = { id: 7, customer: { name: 'Олег Рябов' } };
    expect(orderLabel(order), 'Заказ без города').toBe('Заказ 7: Олег Рябов, не указан');
  });
});

describe('splitQueue: краевые случаи', () => {
  it('пустая очередь', () => {
    const result = splitQueue([]);
    expect(result.next, 'Первого заказа нет').toBeUndefined();
    expect(result.waiting, 'Ожидающих нет, но это массив').toEqual([]);
  });

  it('один заказ в очереди', () => {
    expect(splitQueue([1001]), 'Очередь из одного заказа').toEqual({ next: 1001, waiting: [] });
  });

  it('исходный массив не меняется', () => {
    const queue = [1, 2, 3];
    splitQueue(queue);
    expect(queue, 'Исходная очередь').toEqual([1, 2, 3]);
  });
});
