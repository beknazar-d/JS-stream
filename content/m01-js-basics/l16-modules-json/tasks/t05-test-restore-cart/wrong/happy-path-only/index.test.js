import { restoreCart } from './index.js';

describe('restoreCart', () => {
  it('восстанавливает позиции', () => {
    const text = '{"items":[{"sku":"A-100","qty":2}]}';
    expect(restoreCart(text), 'Одна позиция').toEqual({ items: [{ sku: 'A-100', qty: 2 }] });
  });

  it('пустая корзина', () => {
    expect(restoreCart('{"items":[]}'), 'Пустая корзина').toEqual({ items: [] });
  });
});
