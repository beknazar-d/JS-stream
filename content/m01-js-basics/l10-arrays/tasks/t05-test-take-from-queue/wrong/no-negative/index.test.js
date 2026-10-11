import { takeFromQueue } from './index.js';

describe('takeFromQueue', () => {
  it('делит очередь на две части', () => {
    const result = takeFromQueue(['A-1', 'A-2', 'A-3', 'A-4'], 2);
    expect(result.taken, 'Взято').toEqual(['A-1', 'A-2']);
    expect(result.rest, 'Остаток').toEqual(['A-3', 'A-4']);
  });

  it('count равен нулю', () => {
    const result = takeFromQueue(['A-1', 'A-2'], 0);
    expect(result.taken, 'Ничего не взято').toEqual([]);
    expect(result.rest, 'Всё осталось').toEqual(['A-1', 'A-2']);
  });

  it('очередь не меняется', () => {
    const queue = ['A-1', 'A-2', 'A-3'];
    takeFromQueue(queue, 2);
    expect(queue, 'Очередь после вызова').toEqual(['A-1', 'A-2', 'A-3']);
  });
});
