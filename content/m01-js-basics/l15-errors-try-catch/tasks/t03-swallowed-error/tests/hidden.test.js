import { reserve, placeOrder } from './index.js';

describe('Граница остатка', () => {
  it('можно забрать весь остаток', () => {
    expect(reserve(10, 10), 'reserve: заказ ровно на весь остаток').toBe(0);
    expect(placeOrder(10, 10), 'placeOrder: заказ ровно на весь остаток').toEqual({ ok: true, left: 0 });
  });

  it('на единицу больше — отказ', () => {
    expect(() => reserve(10, 11), 'reserve: на единицу больше остатка').toThrow('Недостаточно товара на складе');
    expect(placeOrder(10, 11).ok, 'placeOrder: на единицу больше остатка').toBe(false);
  });
});

describe('Ошибка не прячется', () => {
  it('reserve не возвращает undefined при отказе', () => {
    let result = 'не вызывалась';
    try {
      result = reserve(5, 6);
    } catch (error) {
      result = 'ошибка';
    }
    expect(result, 'Что получил вызывающий код').toBe('ошибка');
  });

  it('reserve выбрасывает именно Error', () => {
    expect(() => reserve(1, 2), 'Тип ошибки').toThrow(Error);
  });
});
