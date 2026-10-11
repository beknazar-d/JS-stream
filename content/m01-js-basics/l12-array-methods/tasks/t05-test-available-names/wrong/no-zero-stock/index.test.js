import { availableNames } from './index.js';

const products = [
  { name: 'Кроссовки', price: 4500, quantity: 3 },
  { name: 'Кепка', price: 1200, quantity: 8 },
  { name: 'Шарф', price: 1000, quantity: 2 },
];

describe('availableNames', () => {
  it('отбирает товары в наличии не дороже лимита', () => {
    expect(availableNames(products, 2000), 'Лимит 2000').toEqual(['Кепка', 'Шарф']);
  });

  it('товар ровно за лимит остаётся в списке', () => {
    expect(availableNames(products, 1000), 'Лимит 1000').toEqual(['Шарф']);
  });

  it('без лимита возвращает все товары', () => {
    expect(availableNames(products), 'Лимит не задан').toEqual(['Кроссовки', 'Кепка', 'Шарф']);
  });
});
