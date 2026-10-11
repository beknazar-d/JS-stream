import { volumeDiscount, discountSummary } from './discounts.js';

const line = (sku, price, qty) => ({ sku, name: sku, price, qty });

describe('volumeDiscount', () => {
  it('10 штук дают 5%', () => {
    expect(volumeDiscount([line('A', 10000, 10)]), 'Позиция 10 × 100 ₽').toBe(5000);
  });

  it('9 штук скидки не дают', () => {
    expect(volumeDiscount([line('A', 10000, 9)]), 'Позиция 9 × 100 ₽').toBe(0);
  });
});

describe('discountSummary', () => {
  it('промокод считается после скидки за количество', () => {
    expect(discountSummary([line('A', 10000, 10)], 'SALE10'), 'Корзина 10 × 100 ₽ с SALE10').toEqual({
      subtotal: 100000,
      volume: 5000,
      promo: 9500,
      total: 85500,
    });
  });

  it('старое поведение: корзина без больших позиций', () => {
    const result = discountSummary([line('A', 10000, 2)], 'SALE10');
    expect(result.promo, 'Промокод').toBe(2000);
    expect(result.total, 'Итог').toBe(18000);
  });
});
