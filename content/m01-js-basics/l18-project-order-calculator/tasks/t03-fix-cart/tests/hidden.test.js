import { addItem, subtotal } from './cart.js';
import { ValidationError } from './errors.js';

const coffee = { sku: 'A-100', name: 'Кофе зерновой', price: 19999, qty: 2 };
const filter = { sku: 'F-10', name: 'Фильтры', price: 30000, qty: 1 };

describe('addItem: чистота', () => {
  it('повторное добавление суммирует количество в новой строке', () => {
    const cart = [{ ...coffee }, { ...filter }];
    const next = addItem(cart, { ...coffee, qty: 3 });
    expect(next.map((line) => [line.sku, line.qty]), 'Новая корзина').toEqual([['A-100', 5], ['F-10', 1]]);
    expect(cart[0].qty, 'Количество в старой строке').toBe(2);
    expect(next[0], 'Строка в новой корзине — другой объект').not.toBe(cart[0]);
  });

  it('новая позиция добавляется в конец, старые строки те же', () => {
    const cart = [{ ...coffee }];
    const next = addItem(cart, filter);
    expect(next.map((line) => line.sku), 'Порядок позиций').toEqual(['A-100', 'F-10']);
    expect(cart, 'Старая корзина').toEqual([coffee]);
    expect(next, 'Результат — новый массив').not.toBe(cart);
  });

  it('переданная позиция не меняется', () => {
    const item = { ...filter };
    const next = addItem([], item);
    next[0].qty = 99;
    expect(item.qty, 'Исходная позиция').toBe(1);
  });
});

describe('addItem: проверки', () => {
  const badQty = 'Количество должно быть целым числом больше нуля';
  const badPrice = 'Цена должна быть целым числом копеек';

  for (const qty of [0, -3, 1.5, '2', NaN, undefined]) {
    it(`отклоняет количество ${String(qty)}`, () => {
      expect(() => addItem([], { ...coffee, qty }), `Количество ${String(qty)}`).toThrow(badQty);
    });
  }

  for (const price of [199.99, -1, '100', NaN, undefined]) {
    it(`отклоняет цену ${String(price)}`, () => {
      expect(() => addItem([], { ...coffee, price }), `Цена ${String(price)}`).toThrow(badPrice);
    });
  }

  it('нулевая цена допустима', () => {
    expect(addItem([], { ...coffee, price: 0 })[0].price, 'Подарок за 0 копеек').toBe(0);
  });
});

describe('subtotal', () => {
  it('пустая корзина', () => {
    expect(subtotal([]), 'Пустая корзина').toBe(0);
  });

  it('цена на количество', () => {
    expect(subtotal([coffee, filter]), '2 × 19999 + 30000').toBe(69998);
  });

  it('сумма всегда целая', () => {
    const cart = [{ sku: 'x', name: 'x', price: 3333, qty: 7 }, { sku: 'y', name: 'y', price: 1, qty: 3 }];
    expect(Number.isInteger(subtotal(cart)), 'Результат — целое число копеек').toBe(true);
  });
});
