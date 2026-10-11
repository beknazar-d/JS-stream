import { splitIntoBatches } from './index.js';

describe('splitIntoBatches: краевые случаи', () => {
  it('размер больше очереди: одна партия', () => {
    expect(splitIntoBatches(['A-1', 'A-2'], 10), 'Два заказа, тележка на десять').toEqual([['A-1', 'A-2']]);
  });

  it('размер равен длине очереди: одна партия', () => {
    expect(splitIntoBatches(['A-1', 'A-2', 'A-3'], 3), 'Ровно по размеру').toEqual([['A-1', 'A-2', 'A-3']]);
  });

  it('размер 1: каждый заказ в своей партии', () => {
    expect(splitIntoBatches(['A-1', 'A-2', 'A-3'], 1), 'По одному').toEqual([['A-1'], ['A-2'], ['A-3']]);
  });

  it('семь заказов по три: ни один не потерян', () => {
    const orders = ['A-1', 'A-2', 'A-3', 'A-4', 'A-5', 'A-6', 'A-7'];
    const batches = splitIntoBatches(orders, 3);
    expect(batches, 'Три партии').toHaveLength(3);
    expect(batches.at(-1), 'Последняя партия').toEqual(['A-7']);
  });
});

describe('splitIntoBatches: исходные данные', () => {
  it('очередь не меняется', () => {
    const orders = ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'];
    splitIntoBatches(orders, 2);
    expect(orders, 'Очередь после разбиения').toEqual(['A-1', 'A-2', 'A-3', 'A-4', 'A-5']);
  });

  it('очередь не меняется и для пустого результата', () => {
    const orders = [];
    splitIntoBatches(orders, 2);
    expect(orders, 'Пустая очередь').toEqual([]);
  });
});
