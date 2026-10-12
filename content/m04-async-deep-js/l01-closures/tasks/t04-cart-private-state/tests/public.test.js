import { createCart } from './index.js';

describe('createCart: основное', () => {
  it('пустая корзина', () => {
    const cart = createCart();
    expect(cart.items(), 'Позиции пустой корзины').toEqual([]);
    expect(cart.total(), 'Сумма пустой корзины').toBe(0);
    expect(cart.count(), 'Количество штук в пустой корзине').toBe(0);
  });

  it('добавляет товары и считает сумму', () => {
    const cart = createCart();
    cart.add('kettle', 2500, 1);
    cart.add('cup', 400, 3);
    expect(cart.total(), 'Чайник 2500 + три кружки по 400').toBe(3700);
    expect(cart.count(), 'Четыре штуки').toBe(4);
    expect(cart.items(), 'Позиции в порядке добавления').toEqual([
      { sku: 'kettle', price: 2500, qty: 1 },
      { sku: 'cup', price: 400, qty: 3 },
    ]);
  });

  it('повторное добавление увеличивает количество', () => {
    const cart = createCart();
    cart.add('kettle', 2500, 1);
    const qty = cart.add('kettle', 2500, 2);
    expect(qty, 'add возвращает количество после добавления').toBe(3);
    expect(cart.items(), 'Одна строка, а не две').toEqual([{ sku: 'kettle', price: 2500, qty: 3 }]);
  });

  it('удаляет строку', () => {
    const cart = createCart();
    cart.add('kettle', 2500, 1);
    cart.add('cup', 400, 3);
    expect(cart.remove('cup'), 'Удаление существующей строки').toBe(true);
    expect(cart.items().map((line) => line.sku), 'Остался чайник').toEqual(['kettle']);
  });
});
