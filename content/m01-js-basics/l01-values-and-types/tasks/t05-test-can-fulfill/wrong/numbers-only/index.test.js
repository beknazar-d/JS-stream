import { canFulfill } from './index.js';

describe('canFulfill', () => {
  it('разрешает, когда товара хватает', () => {
    expect(canFulfill(3, 10), 'Запрос 3 при остатке 10').toBe(true);
  });

  it('разрешает запрос ровно на весь остаток', () => {
    expect(canFulfill(10, 10), 'Запрос 10 при остатке 10').toBe(true);
  });

  it('отказывает, когда товара не хватает', () => {
    expect(canFulfill(11, 10), 'Запрос 11 при остатке 10').toBe(false);
  });

  it('отказывает на ноль, минус и дробь', () => {
    expect(canFulfill(0, 10), 'Запрос 0').toBe(false);
    expect(canFulfill(-2, 10), 'Запрос -2').toBe(false);
    expect(canFulfill(1.5, 10), 'Запрос 1.5').toBe(false);
  });
});
