import { restoreCart } from './index.js';

describe('restoreCart', () => {
  it('восстанавливает позиции и превращает qty в число', () => {
    const result = restoreCart('{"items":[{"sku":"A-100","qty":"2","debug":1}]}');
    expect(result, 'Позиция с qty-строкой').toEqual({ items: [{ sku: 'A-100', qty: 2 }] });
  });

  it('обрезанный JSON', () => {
    expect(() => restoreCart('{"items":[{"sku":'), 'Обрезанная строка').toThrow('Корзина повреждена');
    expect(() => restoreCart('корзина'), 'Слово вместо JSON').toThrow('Корзина повреждена');
  });
});
