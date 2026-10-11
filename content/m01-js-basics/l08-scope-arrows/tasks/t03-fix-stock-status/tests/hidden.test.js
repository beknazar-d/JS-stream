import { stockStatus } from './index.js';

describe('stockStatus: границы', () => {
  it('ровно десять штук — ещё «Мало»', () => {
    expect(stockStatus(10), 'Остаток 10').toBe('Мало');
  });

  it('одиннадцать штук — «В наличии»', () => {
    expect(stockStatus(11), 'Остаток 11').toBe('В наличии');
  });

  it('одна штука — «Мало»', () => {
    expect(stockStatus(1), 'Остаток 1').toBe('Мало');
  });

  it('отрицательный остаток — нет в наличии', () => {
    expect(stockStatus(-3), 'Остаток -3 (ошибка учёта)').toBe('Нет в наличии');
  });
});
