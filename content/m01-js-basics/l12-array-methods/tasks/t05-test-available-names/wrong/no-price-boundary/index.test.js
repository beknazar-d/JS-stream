import { availableNames } from './index.js';

const products = [
  { name: 'Кроссовки', price: 4500, quantity: 3 },
  { name: 'Носки', price: 300, quantity: 0 },
  { name: 'Кепка', price: 1200, quantity: 8 },
];

describe('availableNames', () => {
  it('отбирает товары в наличии не дороже лимита', () => {
    expect(availableNames(products, 2000), 'Лимит 2000').toEqual(['Кепка']);
  });

  it('товар с нулевым остатком не попадает в список', () => {
    expect(availableNames(products, 500), 'Носки закончились').toEqual([]);
  });

  it('без лимита возвращает все товары в наличии', () => {
    expect(availableNames(products), 'Лимит не задан').toEqual(['Кроссовки', 'Кепка']);
  });
});
