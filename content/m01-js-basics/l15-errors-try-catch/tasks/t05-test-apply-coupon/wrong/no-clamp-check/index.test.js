import { applyCoupon } from './index.js';

describe('applyCoupon', () => {
  it('скидки на крупных суммах', () => {
    expect(applyCoupon(1000, 'SALE10'), 'SALE10 на 1000').toBe(900);
    expect(applyCoupon(2000, 'MINUS500'), 'MINUS500 на 2000').toBe(1500);
  });

  it('неизвестный код', () => {
    expect(() => applyCoupon(1000, 'FREE'), 'Код FREE').toThrow('Неизвестный промокод: FREE');
  });

  it('плохая сумма', () => {
    expect(() => applyCoupon(-1, 'SALE10'), 'Сумма -1').toThrow('Сумма заказа должна быть неотрицательным числом');
    expect(() => applyCoupon('100', 'SALE10'), 'Сумма строкой').toThrow('Сумма заказа должна быть неотрицательным числом');
  });
});
