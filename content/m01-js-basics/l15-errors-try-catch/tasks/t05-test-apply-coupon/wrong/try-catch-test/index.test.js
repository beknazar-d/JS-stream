import { applyCoupon } from './index.js';

describe('applyCoupon', () => {
  it('скидки и граница', () => {
    expect(applyCoupon(1000, 'SALE10'), 'SALE10 на 1000').toBe(900);
    expect(applyCoupon(300, 'MINUS500'), 'MINUS500 на 300').toBe(0);
  });

  it('неизвестный код', () => {
    try {
      applyCoupon(1000, 'FREE');
    } catch (error) {
      expect(error.message, 'Текст ошибки').toBe('Неизвестный промокод: FREE');
    }
  });

  it('плохая сумма', () => {
    expect(() => applyCoupon(-1, 'SALE10'), 'Сумма -1').toThrow('Сумма заказа должна быть неотрицательным числом');
    expect(() => applyCoupon('100', 'SALE10'), 'Сумма строкой').toThrow('Сумма заказа должна быть неотрицательным числом');
  });
});
