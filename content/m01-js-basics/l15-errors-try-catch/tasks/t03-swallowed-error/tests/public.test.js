import { reserve, placeOrder } from './index.js';

describe('reserve', () => {
  it('списывает товар', () => {
    expect(reserve(10, 3), 'Остаток 10, заказ 3').toBe(7);
  });

  it('выбрасывает ошибку, если товара не хватает', () => {
    expect(() => reserve(10, 30), 'Остаток 10, заказ 30').toThrow('Недостаточно товара на складе');
  });
});

describe('placeOrder', () => {
  it('успешный заказ', () => {
    expect(placeOrder(10, 3), 'Остаток 10, заказ 3').toEqual({ ok: true, left: 7 });
  });

  it('отказ без падения', () => {
    expect(placeOrder(10, 30), 'Остаток 10, заказ 30').toEqual({ ok: false, reason: 'Недостаточно товара на складе' });
  });
});
