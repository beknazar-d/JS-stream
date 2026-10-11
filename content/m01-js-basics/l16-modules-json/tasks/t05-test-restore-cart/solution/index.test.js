import { restoreCart } from './index.js';

const BROKEN = 'Корзина повреждена';

describe('restoreCart: нормальная корзина', () => {
  it('восстанавливает позиции', () => {
    const text = '{"items":[{"sku":"A-100","qty":2},{"sku":"B-200","qty":1}]}';
    expect(restoreCart(text), 'Две позиции').toEqual({ items: [{ sku: 'A-100', qty: 2 }, { sku: 'B-200', qty: 1 }] });
  });

  it('пустая корзина тоже корректна', () => {
    expect(restoreCart('{"items":[]}'), 'Пустой список позиций').toEqual({ items: [] });
  });

  it('превращает количество-строку в число', () => {
    const result = restoreCart('{"items":[{"sku":"A-100","qty":"2"}]}');
    expect(result.items[0].qty, 'Количество «2» из формы').toBe(2);
  });

  it('отбрасывает лишние поля', () => {
    const result = restoreCart('{"items":[{"sku":"A-100","qty":1,"debug":true}],"version":3}');
    expect(result, 'Лишние поля в позиции и в корзине').toEqual({ items: [{ sku: 'A-100', qty: 1 }] });
  });
});

describe('restoreCart: текст не JSON', () => {
  it('обрезанный JSON', () => {
    expect(() => restoreCart('{"items":[{"sku":'), 'Обрезанная строка').toThrow(BROKEN);
  });

  it('пустая строка и обычный текст', () => {
    expect(() => restoreCart(''), 'Пустая строка').toThrow(BROKEN);
    expect(() => restoreCart('корзина'), 'Слово вместо JSON').toThrow(BROKEN);
  });

  it('значение undefined (в хранилище ничего не было)', () => {
    expect(() => restoreCart(undefined), 'Ключа в хранилище нет').toThrow(BROKEN);
  });
});

describe('restoreCart: JSON не в форме корзины', () => {
  it('число, null и массив вместо объекта', () => {
    expect(() => restoreCart('5'), 'Число').toThrow(BROKEN);
    expect(() => restoreCart('null'), 'null').toThrow(BROKEN);
    expect(() => restoreCart('[]'), 'Массив').toThrow(BROKEN);
  });

  it('items не массив', () => {
    expect(() => restoreCart('{"items":5}'), 'items — число').toThrow(BROKEN);
    expect(() => restoreCart('{"items":{"sku":"A"}}'), 'items — объект').toThrow(BROKEN);
  });

  it('items отсутствует', () => {
    expect(() => restoreCart('{}'), 'Пустой объект').toThrow(BROKEN);
  });
});
