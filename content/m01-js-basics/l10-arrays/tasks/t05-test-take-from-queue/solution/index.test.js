import { takeFromQueue } from './index.js';

describe('takeFromQueue: обычная выдача', () => {
  it('отдаёт первые заказы и оставляет остальные', () => {
    const result = takeFromQueue(['A-1', 'A-2', 'A-3', 'A-4'], 2);
    expect(result.taken, 'Взято два заказа').toEqual(['A-1', 'A-2']);
    expect(result.rest, 'Остались два заказа').toEqual(['A-3', 'A-4']);
  });

  it('count равен длине очереди: остаток пустой', () => {
    const result = takeFromQueue(['A-1', 'A-2'], 2);
    expect(result.taken, 'Взяты все').toEqual(['A-1', 'A-2']);
    expect(result.rest, 'Остатка нет').toEqual([]);
  });

  it('count больше длины очереди: берётся всё', () => {
    const result = takeFromQueue(['A-1', 'A-2'], 10);
    expect(result.taken, 'Взяты все').toEqual(['A-1', 'A-2']);
    expect(result.rest, 'Остатка нет').toEqual([]);
  });
});

describe('takeFromQueue: нулевые и неверные значения', () => {
  it('count равен нулю: ничего не взято', () => {
    const result = takeFromQueue(['A-1', 'A-2'], 0);
    expect(result.taken, 'Ничего не взято').toEqual([]);
    expect(result.rest, 'Вся очередь осталась').toEqual(['A-1', 'A-2']);
  });

  it('отрицательный count не берёт ничего', () => {
    const result = takeFromQueue(['A-1', 'A-2', 'A-3'], -2);
    expect(result.taken, 'Для -2 ничего не взято').toEqual([]);
    expect(result.rest, 'Для -2 вся очередь осталась').toEqual(['A-1', 'A-2', 'A-3']);
  });

  it('пустая очередь даёт два пустых набора', () => {
    const result = takeFromQueue([], 3);
    expect(result.taken, 'Взято из пустой очереди').toEqual([]);
    expect(result.rest, 'Остаток пустой очереди').toEqual([]);
  });
});

describe('takeFromQueue: исходная очередь', () => {
  it('переданная очередь не меняется', () => {
    const queue = ['A-1', 'A-2', 'A-3', 'A-4'];
    takeFromQueue(queue, 2);
    expect(queue, 'Очередь после вызова').toEqual(['A-1', 'A-2', 'A-3', 'A-4']);
  });

  it('очередь не меняется и при count больше длины', () => {
    const queue = ['A-1', 'A-2'];
    takeFromQueue(queue, 5);
    expect(queue, 'Очередь после вызова с большим count').toEqual(['A-1', 'A-2']);
  });
});
