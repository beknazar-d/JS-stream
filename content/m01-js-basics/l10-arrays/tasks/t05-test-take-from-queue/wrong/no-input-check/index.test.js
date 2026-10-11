import { takeFromQueue } from './index.js';

describe('takeFromQueue', () => {
  it('делит очередь на две части', () => {
    const result = takeFromQueue(['A-1', 'A-2', 'A-3', 'A-4'], 2);
    expect(result.taken, 'Взято').toEqual(['A-1', 'A-2']);
    expect(result.rest, 'Остаток').toEqual(['A-3', 'A-4']);
  });

  it('отрицательный count не берёт ничего', () => {
    const result = takeFromQueue(['A-1', 'A-2', 'A-3'], -2);
    expect(result.taken, 'Для -2').toEqual([]);
    expect(result.rest, 'Остаток для -2').toEqual(['A-1', 'A-2', 'A-3']);
  });

  it('count больше длины', () => {
    const result = takeFromQueue(['A-1'], 5);
    expect(result.taken, 'Взято').toEqual(['A-1']);
    expect(result.rest, 'Остаток').toEqual([]);
  });
});
