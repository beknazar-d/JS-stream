import { addOrder, takeNextOrder, lastOrder } from './index.js';

describe('Очередь заказов', () => {
  it('addOrder ставит заказ в конец и возвращает длину', () => {
    const queue = ['A-101'];
    expect(addOrder(queue, 'A-102'), 'Новая длина очереди').toBe(2);
    expect(queue, 'Очередь после добавления').toEqual(['A-101', 'A-102']);
  });

  it('takeNextOrder отдаёт первый заказ', () => {
    const queue = ['A-101', 'A-102'];
    expect(takeNextOrder(queue), 'Первый заказ в очереди').toBe('A-101');
    expect(queue, 'Очередь после выдачи').toEqual(['A-102']);
  });

  it('lastOrder показывает последний заказ и ничего не убирает', () => {
    const queue = ['A-101', 'A-102'];
    expect(lastOrder(queue), 'Последний заказ').toBe('A-102');
    expect(queue, 'Очередь не изменилась').toEqual(['A-101', 'A-102']);
  });
});
