import { totalWithCoupon } from './index.js';

describe('totalWithCoupon', () => {
  it('заказ 1001: купон 15 процентов', () => {
    expect(totalWithCoupon(2000, '15%'), 'Цена 2000 и купон «15%»').toBe(1700);
  });

  it('заказ 1002: купона нет', () => {
    expect(totalWithCoupon(1500, undefined), 'Купон не передан').toBe(1500);
  });

  it('пустая строка вместо купона', () => {
    expect(totalWithCoupon(1000, ''), 'Пустое поле купона').toBe(1000);
  });
});
