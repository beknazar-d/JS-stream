import { rankProducts } from './index.js';

const names = (list) => list.map((product) => product.name);

describe('rankProducts: числа и строки', () => {
  it('продажи сравниваются как числа', () => {
    const products = [
      { name: 'Носки', sold: 9 },
      { name: 'Кепка', sold: 100 },
      { name: 'Шарф', sold: 15 },
    ];
    expect(names(rankProducts(products)), '100 больше 15 и 9').toEqual(['Кепка', 'Шарф', 'Носки']);
  });

  it('смесь равных и разных продаж', () => {
    const products = [
      { name: 'Шарф', sold: 10 },
      { name: 'Ботинки', sold: 30 },
      { name: 'Кепка', sold: 10 },
      { name: 'Арбуз', sold: 10 },
    ];
    expect(names(rankProducts(products)), 'Лидер, потом алфавит среди равных').toEqual(['Ботинки', 'Арбуз', 'Кепка', 'Шарф']);
  });

  it('товар с нулём продаж идёт последним', () => {
    const products = [{ name: 'Шарф', sold: 0 }, { name: 'Кепка', sold: 3 }];
    expect(names(rankProducts(products)), 'Ноль продаж').toEqual(['Кепка', 'Шарф']);
  });
});

describe('rankProducts: исходные данные', () => {
  it('исходный массив не переставляется', () => {
    const products = [{ name: 'Шарф', sold: 40 }, { name: 'Кепка', sold: 120 }];
    rankProducts(products);
    expect(names(products), 'Порядок каталога').toEqual(['Шарф', 'Кепка']);
  });

  it('результат — другой массив', () => {
    const products = [{ name: 'Кепка', sold: 1 }];
    expect(rankProducts(products), 'Новый массив').not.toBe(products);
  });

  it('пустой каталог', () => {
    expect(rankProducts([]), 'Пустой каталог').toEqual([]);
  });
});
