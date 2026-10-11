import { quantityOrOne, sameValue, isNotANumber } from './index.js';

describe('quantityOrOne', () => {
  it('подставляет единицу, когда значения нет', () => {
    expect(quantityOrOne(undefined), 'Поле не пришло').toBe(1);
    expect(quantityOrOne(null), 'Поле null').toBe(1);
  });

  it('оставляет настоящие значения', () => {
    expect(quantityOrOne(5), 'Количество 5').toBe(5);
    expect(quantityOrOne(0), 'Количество 0 — настоящее значение').toBe(0);
  });
});

describe('sameValue', () => {
  it('строгое сравнение', () => {
    expect(sameValue(5, 5), 'Одинаковые числа').toBe(true);
    expect(sameValue('5', 5), 'Строка и число').toBe(false);
  });
});

describe('isNotANumber', () => {
  it('находит NaN', () => {
    expect(isNotANumber(NaN), 'Значение NaN').toBe(true);
    expect(isNotANumber(5), 'Число 5').toBe(false);
  });
});
