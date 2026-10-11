import { removeFromCart } from './index.js';

describe('removeFromCart: границы', () => {
  it('удаляет первый элемент', () => {
    const cart = ['RUN-42', 'SOCK-07'];
    expect(removeFromCart(cart, 'RUN-42'), 'Результат при удалении первого').toBe(true);
    expect(cart, 'Корзина без первого').toEqual(['SOCK-07']);
  });

  it('удаляет единственный элемент', () => {
    const cart = ['CAP-01'];
    expect(removeFromCart(cart, 'CAP-01'), 'Результат при удалении единственного').toBe(true);
    expect(cart, 'Корзина опустела').toEqual([]);
  });

  it('пустая корзина остаётся пустой', () => {
    const cart = [];
    expect(removeFromCart(cart, 'CAP-01'), 'Результат для пустой корзины').toBe(false);
    expect(cart, 'Пустая корзина').toEqual([]);
  });
});

describe('removeFromCart: повторы', () => {
  it('удаляет только первое вхождение', () => {
    const cart = ['SOCK-07', 'RUN-42', 'SOCK-07'];
    removeFromCart(cart, 'SOCK-07');
    expect(cart, 'Две пары носков, убрана одна').toEqual(['RUN-42', 'SOCK-07']);
  });

  it('последний товар удаляется, только когда его просят', () => {
    const cart = ['RUN-42', 'CAP-01'];
    removeFromCart(cart, 'GLOVE-03');
    expect(cart, 'Последний товар на месте').toHaveLength(2);
    expect(cart.at(-1), 'Последний товар остался кепкой').toBe('CAP-01');
  });
});
