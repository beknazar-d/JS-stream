import { addItem, subtotal } from './cart.js';
import { ValidationError } from './errors.js';

const coffee = { sku: 'A-100', name: 'Кофе зерновой', price: 19999, qty: 1 };

describe('cart', () => {
  it('сумма трёх позиций по 199,99 ₽ целая', () => {
    const cart = [coffee, { ...coffee, sku: 'B' }, { ...coffee, sku: 'C' }];
    expect(subtotal(cart), 'Три позиции по 19999 копеек').toBe(59997);
  });

  it('addItem не меняет старую корзину', () => {
    const cart = [];
    const next = addItem(cart, coffee);
    expect(cart, 'Старая корзина').toEqual([]);
    expect(next, 'Новая корзина').toEqual([coffee]);
  });

  it('нулевое количество отклоняется', () => {
    expect(() => addItem([], { ...coffee, qty: 0 }), 'Количество 0').toThrow(ValidationError);
  });
});
