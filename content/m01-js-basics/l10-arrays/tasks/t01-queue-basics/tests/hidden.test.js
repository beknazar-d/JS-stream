import { addOrder, takeNextOrder, lastOrder } from './index.js';

describe('Пустая очередь', () => {
  it('takeNextOrder возвращает null', () => {
    expect(takeNextOrder([]), 'Выдача из пустой очереди').toBeNull();
  });

  it('lastOrder возвращает null', () => {
    expect(lastOrder([]), 'Последний заказ в пустой очереди').toBeNull();
  });

  it('addOrder работает с пустой очередью', () => {
    const queue = [];
    expect(addOrder(queue, 'B-1'), 'Длина после первого заказа').toBe(1);
    expect(queue, 'Очередь после добавления').toEqual(['B-1']);
  });
});

describe('Порядок выдачи', () => {
  it('заказы выдаются в порядке добавления', () => {
    const queue = [];
    addOrder(queue, 'B-1');
    addOrder(queue, 'B-2');
    addOrder(queue, 'B-3');
    expect(takeNextOrder(queue), 'Первая выдача').toBe('B-1');
    expect(takeNextOrder(queue), 'Вторая выдача').toBe('B-2');
    expect(lastOrder(queue), 'Остался один заказ').toBe('B-3');
  });

  it('очередь из одного заказа: первый и последний совпадают', () => {
    const queue = ['B-7'];
    expect(lastOrder(queue), 'Последний в очереди из одного').toBe('B-7');
    expect(takeNextOrder(queue), 'Выдача единственного').toBe('B-7');
    expect(queue, 'Очередь опустела').toEqual([]);
  });
});
