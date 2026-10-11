import { removeFromCart } from './index.js';

describe('removeFromCart', () => {
  it('удаляет товар из середины корзины', () => {
    const cart = ['RUN-42', 'SOCK-07', 'CAP-01'];
    expect(removeFromCart(cart, 'SOCK-07'), 'Результат при успешном удалении').toBe(true);
    expect(cart, 'Корзина после удаления').toEqual(['RUN-42', 'CAP-01']);
  });

  it('случай из баг-репорта: товара нет, корзина цела', () => {
    const cart = ['RUN-42', 'SOCK-07', 'CAP-01'];
    expect(removeFromCart(cart, 'GLOVE-03'), 'Результат для отсутствующего товара').toBe(false);
    expect(cart, 'Корзина не должна измениться').toEqual(['RUN-42', 'SOCK-07', 'CAP-01']);
  });
});
