import { canFulfill } from './index.js';

describe('canFulfill', () => {
  it('разрешает, когда товара хватает', () => {
    expect(canFulfill(3, 10), 'Запрос 3 при остатке 10').toBe(true);
  });

  it('отказывает, когда товара не хватает', () => {
    expect(canFulfill(11, 10), 'Запрос 11 при остатке 10').toBe(false);
  });

  it('отказывает на ноль и дробь', () => {
    expect(canFulfill(0, 10), 'Запрос 0').toBe(false);
    expect(canFulfill(1.5, 10), 'Запрос 1.5').toBe(false);
  });

  it('работает со строками', () => {
    expect(canFulfill('9', '10'), 'Строки "9" и "10"').toBe(true);
    expect(canFulfill('abc', 10), 'Запрос "abc"').toBe(false);
  });
});
