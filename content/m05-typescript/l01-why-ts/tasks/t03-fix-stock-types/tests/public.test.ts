import { parseStock, lowStockCount, stockLabel } from './index.js';

describe('parseStock', () => {
  it('разбирает целое число', () => {
    expect(parseStock('12'), 'Строка "12"').toBe(12);
  });
  it('отбрасывает пробелы по краям', () => {
    expect(parseStock(' 7 '), 'Строка " 7 "').toBe(7);
  });
});

describe('lowStockCount', () => {
  it('считает позиции строго меньше порога', () => {
    expect(lowStockCount([5, 0, 12, 3], 5), 'Остатки 5, 0, 12, 3 при пороге 5').toBe(2);
  });
});

describe('stockLabel', () => {
  it('собирает подпись', () => {
    expect(stockLabel('Чайник', 5), 'Подпись для чайника').toBe('Чайник: 5');
  });
});
