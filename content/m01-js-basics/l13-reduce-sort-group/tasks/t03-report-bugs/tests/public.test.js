import { cartTotal, cheapestFirst } from './index.js';

const cart = () => [
  { name: 'Кроссовки', price: 4500, quantity: 1 },
  { name: 'Носки', price: 300, quantity: 3 },
];

describe('cartTotal', () => {
  it('случай из баг-репорта: итог 5400', () => {
    expect(cartTotal(cart()), 'Кроссовки ×1 и носки ×3').toBe(5400);
  });
});

describe('cheapestFirst', () => {
  it('сортирует по возрастанию цены', () => {
    const names = cheapestFirst(cart()).map((item) => item.name);
    expect(names, 'Порядок по цене').toEqual(['Носки', 'Кроссовки']);
  });

  it('случай из баг-репорта: корзина не переставляется', () => {
    const items = cart();
    cheapestFirst(items);
    expect(items.map((item) => item.name), 'Порядок в корзине').toEqual(['Кроссовки', 'Носки']);
  });
});
