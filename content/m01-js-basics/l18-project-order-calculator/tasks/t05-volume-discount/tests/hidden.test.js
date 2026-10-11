import { volumeDiscount, discountSummary, applyPromo } from './discounts.js';
import { subtotal } from './cart.js';
import { ValidationError } from './errors.js';

const line = (sku, price, qty) => ({ sku, name: sku, price, qty });

describe('volumeDiscount: границы и округление', () => {
  it('ровно 10 штук и 11 штук', () => {
    expect(volumeDiscount([line('A', 1000, 10)]), '10 штук').toBe(500);
    expect(volumeDiscount([line('A', 1000, 11)]), '11 штук').toBe(550);
  });

  it('половина копейки округляется вверх', () => {
    expect(volumeDiscount([line('A', 1, 10)]), '10 × 1 копейка: 0,5 копейки').toBe(1);
    expect(volumeDiscount([line('A', 3, 10)]), '10 × 3 копейки: 1,5 копейки').toBe(2);
  });

  it('округление по позициям, а не по сумме', () => {
    expect(volumeDiscount([line('A', 1, 10), line('B', 1, 10)]), 'Две позиции по 0,5 копейки').toBe(2);
  });

  it('смешанная корзина', () => {
    expect(volumeDiscount([line('A', 10000, 10), line('B', 10000, 9), line('C', 2000, 20)]), 'Только позиции от 10 штук').toBe(7000);
  });

  it('пустая корзина', () => {
    expect(volumeDiscount([]), 'Пустая корзина').toBe(0);
  });
});

describe('discountSummary: старое поведение не сломано', () => {
  const cart = [line('A', 10000, 3), line('B', 5000, 1)];

  it('без промокода', () => {
    expect(discountSummary(cart, ''), 'Без промокода').toEqual({ subtotal: 35000, volume: 0, promo: 0, total: 35000 });
    expect(discountSummary(cart), 'Промокод не передан').toEqual({ subtotal: 35000, volume: 0, promo: 0, total: 35000 });
  });

  it('SALE10 в разных написаниях', () => {
    expect(discountSummary(cart, ' sale10 ').promo, 'sale10 с пробелами').toBe(3500);
  });

  it('MINUS500: порог и ошибки', () => {
    expect(discountSummary([line('A', 100000, 2)], 'MINUS500').total, 'Заказ ровно 2 000 ₽').toBe(150000);
    expect(() => discountSummary(cart, 'MINUS500'), 'Заказ 350 ₽').toThrow(ValidationError);
    expect(() => discountSummary(cart, 'FREE'), 'Неизвестный код').toThrow('Неизвестный промокод: FREE');
  });
});

describe('discountSummary: новое правило', () => {
  it('порог MINUS500 проверяется после скидки за количество', () => {
    const above = [line('A', 10000, 10), line('B', 105000, 1)];
    const below = [line('A', 10000, 10), line('B', 104999, 1)];
    expect(discountSummary(above, 'MINUS500'), 'После скидки ровно 2 000 ₽').toEqual({ subtotal: 205000, volume: 5000, promo: 50000, total: 150000 });
    expect(() => discountSummary(below, 'MINUS500'), 'После скидки на копейку меньше порога').toThrow('действует от 2 000 ₽');
  });

  it('несколько позиций с разными скидками', () => {
    const cart = [line('A', 10000, 10), line('B', 2000, 20), line('C', 500, 1)];
    expect(discountSummary(cart, 'SALE10'), 'Смешанная корзина с SALE10').toEqual({
      subtotal: 140500,
      volume: 7000,
      promo: 13350,
      total: 120150,
    });
  });

  it('согласованность', () => {
    const cart = [line('A', 333, 10), line('B', 777, 12)];
    const r = discountSummary(cart, 'SALE10');
    expect(r.total, 'total = subtotal - volume - promo').toBe(r.subtotal - r.volume - r.promo);
    expect(r.promo, 'Промокод от суммы после скидки за количество').toBe(applyPromo(r.subtotal - r.volume, 'SALE10'));
  });

  it('корзина не меняется', () => {
    const cart = [line('A', 10000, 10)];
    discountSummary(cart, 'SALE10');
    volumeDiscount(cart);
    expect(cart, 'Корзина после расчётов').toEqual([line('A', 10000, 10)]);
    expect(subtotal(cart), 'Сумма корзины после расчётов').toBe(100000);
  });
});
