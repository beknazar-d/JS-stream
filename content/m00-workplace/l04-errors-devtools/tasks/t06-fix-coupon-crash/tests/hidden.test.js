import { totalWithCoupon } from './index.js';

describe('totalWithCoupon: разные значения купона', () => {
  it('купон равен null', () => {
    expect(totalWithCoupon(1500, null), 'Купон null').toBe(1500);
  });

  it('пробелы вокруг купона', () => {
    expect(totalWithCoupon(1000, ' 10% '), 'Купон « 10% »').toBe(900);
  });

  it('текст вместо числа не ломает итог', () => {
    const result = totalWithCoupon(1000, 'abc');
    expect(Number.isNaN(result), 'Итог не должен быть NaN').toBe(false);
    expect(result, 'Купон «abc» не даёт скидки').toBe(1000);
  });

  it('граничные проценты', () => {
    expect(totalWithCoupon(800, '0%'), 'Купон 0%').toBe(800);
    expect(totalWithCoupon(800, '100%'), 'Купон 100%').toBe(0);
  });

  it('купон без знака процента', () => {
    expect(totalWithCoupon(1000, '20'), 'Число без знака процента').toBe(800);
  });
});
