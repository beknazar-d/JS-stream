import { availableNames } from './index.js';

describe('availableNames', () => {
  it('отбирает товары в наличии не дороже лимита', () => {
    const products = [
      { name: 'Кроссовки', price: 4500, quantity: 3 },
      { name: 'Кепка', price: 1200, quantity: 8 },
    ];
    expect(availableNames(products, 2000), 'Лимит 2000').toEqual(['Кепка']);
  });
});
