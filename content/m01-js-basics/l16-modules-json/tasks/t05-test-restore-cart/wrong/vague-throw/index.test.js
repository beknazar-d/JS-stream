import { restoreCart } from './index.js';

describe('restoreCart', () => {
  it('восстанавливает позиции и превращает qty в число', () => {
    const result = restoreCart('{"items":[{"sku":"A-100","qty":"2","debug":1}]}');
    expect(result, 'Позиция с qty-строкой').toEqual({ items: [{ sku: 'A-100', qty: 2 }] });
  });

  it('плохой текст', () => {
    expect(() => restoreCart('{"items":[{"sku":'), 'Обрезанная строка').toThrow();
    expect(() => restoreCart(''), 'Пустая строка').toThrow();
  });

  it('JSON не в форме корзины', () => {
    expect(() => restoreCart('5'), 'Число').toThrow();
    expect(() => restoreCart('{"items":5}'), 'items — число').toThrow();
    expect(() => restoreCart('null'), 'null').toThrow();
  });
});
