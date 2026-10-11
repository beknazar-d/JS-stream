import { availableNames } from './index.js';

const products = [
  { name: 'Кроссовки', price: 4500, quantity: 3 },
  { name: 'Носки', price: 300, quantity: 0 },
  { name: 'Кепка', price: 1200, quantity: 8 },
  { name: 'Шарф', price: 1000, quantity: 2 },
];

describe('availableNames: лимит цены', () => {
  it('отбирает товары в наличии не дороже лимита', () => {
    expect(availableNames(products, 2000), 'Лимит 2000').toEqual(['Кепка', 'Шарф']);
  });

  it('товар ровно за лимит остаётся в списке', () => {
    expect(availableNames(products, 1000), 'Лимит 1000, шарф стоит 1000').toEqual(['Шарф']);
  });

  it('лимит ниже всех цен: список пустой', () => {
    expect(availableNames(products, 100), 'Лимит 100').toEqual([]);
  });
});

describe('availableNames: наличие', () => {
  it('товар с нулевым остатком не попадает в список', () => {
    expect(availableNames(products, 500), 'Носки за 300 закончились').toEqual([]);
  });
});

describe('availableNames: без лимита', () => {
  it('без второго аргумента возвращает все товары в наличии', () => {
    expect(availableNames(products), 'Лимит не задан').toEqual(['Кроссовки', 'Кепка', 'Шарф']);
  });

  it('пустой каталог', () => {
    expect(availableNames([], 1000), 'Пустой каталог').toEqual([]);
  });
});
