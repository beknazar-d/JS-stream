import { splitIntoBatches } from './index.js';

describe('splitIntoBatches', () => {
  it('делит очередь на равные партии', () => {
    const orders = ['A-1', 'A-2', 'A-3', 'A-4'];
    expect(splitIntoBatches(orders, 2), 'Четыре заказа по два').toEqual([['A-1', 'A-2'], ['A-3', 'A-4']]);
  });

  it('последняя партия может быть короче', () => {
    const orders = ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'];
    expect(splitIntoBatches(orders, 2), 'Пять заказов по два').toEqual([['A-1', 'A-2'], ['A-3', 'A-4'], ['A-5']]);
  });

  it('пустая очередь даёт пустой результат', () => {
    expect(splitIntoBatches([], 3), 'Пустая очередь').toEqual([]);
  });
});
