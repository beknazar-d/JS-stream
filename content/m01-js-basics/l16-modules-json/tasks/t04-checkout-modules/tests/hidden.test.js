import { quote } from './index.js';
import { available, canReserve } from './stock.js';
import discountFor from './discount.js';

const stock = { 'A-100': 20, 'B-200': 2 };
const prices = { 'A-100': 1200, 'B-200': 300 };

describe('stock.js', () => {
  it('available: известный и неизвестный товар', () => {
    expect(available(stock, 'A-100'), 'Остаток A-100').toBe(20);
    expect(available(stock, 'Z-9'), 'Остаток неизвестного товара').toBe(0);
  });

  it('canReserve: граница', () => {
    expect(canReserve(stock, 'B-200', 2), 'Ровно весь остаток').toBe(true);
    expect(canReserve(stock, 'B-200', 3), 'На единицу больше остатка').toBe(false);
    expect(canReserve(stock, 'Z-9', 1), 'Неизвестный товар').toBe(false);
  });
});

describe('discount.js', () => {
  it('экспорт по умолчанию', () => {
    expect(typeof discountFor, 'Импорт по умолчанию из discount.js').toBe('function');
  });

  it('пороги', () => {
    expect(discountFor(1), '1 штука').toBe(0);
    expect(discountFor(4), '4 штуки').toBe(0);
    expect(discountFor(5), '5 штук').toBe(0.05);
    expect(discountFor(9), '9 штук').toBe(0.05);
    expect(discountFor(10), '10 штук').toBe(0.1);
    expect(discountFor(100), '100 штук').toBe(0.1);
  });
});

describe('quote: сборка', () => {
  it('запрос ровно на весь остаток принимается', () => {
    const result = quote([{ sku: 'B-200', qty: 2 }], stock, prices);
    expect(result.lines[0].ok, 'Заказ 2 штуки при остатке 2').toBe(true);
    expect(result.total, 'Итог').toBe(600);
  });

  it('скидка десять процентов', () => {
    expect(quote([{ sku: 'A-100', qty: 10 }], stock, prices).total, '10 штук A-100').toBe(10800);
  });

  it('округление до копеек', () => {
    expect(quote([{ sku: 'X', qty: 7 }], { X: 50 }, { X: 33.33 }).total, '7 штук по 33.33 со скидкой 5%').toBe(221.64);
  });

  it('нехватка не входит в общий итог', () => {
    const result = quote([{ sku: 'A-100', qty: 1 }, { sku: 'B-200', qty: 5 }, { sku: 'Z-9', qty: 1 }], stock, prices);
    expect(result.lines.map((line) => line.ok), 'Признак наличия по позициям').toEqual([true, false, false]);
    expect(result.total, 'Итог только по позициям в наличии').toBe(1200);
  });

  it('пустая корзина', () => {
    expect(quote([], stock, prices), 'Пустая корзина').toEqual({ lines: [], total: 0 });
  });

  it('входные данные не меняются', () => {
    const cart = [{ sku: 'A-100', qty: 5 }];
    quote(cart, stock, prices);
    expect(cart, 'Корзина').toEqual([{ sku: 'A-100', qty: 5 }]);
    expect(stock, 'Склад').toEqual({ 'A-100': 20, 'B-200': 2 });
  });
});
