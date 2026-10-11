import { calculateOrder } from './index.js';

const line = (sku, price, qty) => ({ sku, name: `Товар ${sku}`, price, qty });

describe('calculateOrder', () => {
  it('заказ с платной доставкой', () => {
    const cart = [line('A', 100000, 2), line('B', 50000, 1)];
    expect(calculateOrder(cart, ''), 'Заказ на 2 500 ₽').toEqual({
      lines: [
        { sku: 'A', name: 'Товар A', price: 100000, qty: 2, total: 200000 },
        { sku: 'B', name: 'Товар B', price: 50000, qty: 1, total: 50000 },
      ],
      subtotal: 250000,
      volume: 0,
      promo: 0,
      goods: 250000,
      delivery: 29900,
      vat: 46650,
      total: 279900,
    });
  });

  it('бесплатная доставка от 3 000 ₽', () => {
    const result = calculateOrder([line('A', 300000, 1)], '');
    expect(result.delivery, 'Доставка при заказе ровно на 3 000 ₽').toBe(0);
    expect(result.total, 'Итог').toBe(300000);
  });

  it('пустая корзина', () => {
    expect(() => calculateOrder([], ''), 'Пустая корзина').toThrow('Корзина пуста');
  });
});
