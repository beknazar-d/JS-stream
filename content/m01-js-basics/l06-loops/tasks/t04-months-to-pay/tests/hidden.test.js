import { monthsToPay } from './index.js';

describe('monthsToPay: границы', () => {
  it('платёж больше цены — один месяц', () => {
    expect(monthsToPay(500, 3000), 'Цена 500, платёж 3000').toBe(1);
  });

  it('платёж равен цене', () => {
    expect(monthsToPay(3000, 3000), 'Цена равна платежу').toBe(1);
  });

  it('копейка сверх кратной суммы добавляет месяц', () => {
    expect(monthsToPay(3001, 3000), 'Цена 3001, платёж 3000').toBe(2);
  });

  it('отрицательная цена — платить нечего', () => {
    expect(monthsToPay(-100, 500), 'Отрицательная цена').toBe(0);
  });
});

describe('monthsToPay: защита от зависания', () => {
  it('нулевой платёж даёт null', () => {
    expect(monthsToPay(1000, 0), 'Платёж 0').toBeNull();
  });

  it('отрицательный платёж даёт null', () => {
    expect(monthsToPay(1000, -300), 'Платёж -300').toBeNull();
  });

  it('бесконечные значения дают null', () => {
    expect(monthsToPay(Infinity, 300), 'Цена Infinity').toBeNull();
    expect(monthsToPay(1000, Infinity), 'Платёж Infinity').toBeNull();
  });
});

describe('monthsToPay: не числа', () => {
  it('NaN даёт null', () => {
    expect(monthsToPay(NaN, 300), 'Цена NaN').toBeNull();
    expect(monthsToPay(1000, NaN), 'Платёж NaN').toBeNull();
  });

  it('строки и null дают null', () => {
    expect(monthsToPay('12000', 3000), 'Цена строкой').toBeNull();
    expect(monthsToPay(12000, '3000'), 'Платёж строкой').toBeNull();
    expect(monthsToPay(null, 3000), 'Цена null').toBeNull();
    expect(monthsToPay(12000, undefined), 'Платёж не передан').toBeNull();
  });
});
