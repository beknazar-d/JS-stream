import { rankProducts } from './index.js';

const names = (list) => list.map((product) => product.name);

describe('rankProducts', () => {
  it('сортирует по убыванию продаж', () => {
    const products = [
      { name: 'Шарф', sold: 40 },
      { name: 'Кепка', sold: 120 },
      { name: 'Носки', sold: 75 },
    ];
    expect(names(rankProducts(products)), 'Хиты продаж').toEqual(['Кепка', 'Носки', 'Шарф']);
  });

  it('при равных продажах — по алфавиту', () => {
    const products = [
      { name: 'Шарф', sold: 50 },
      { name: 'Кепка', sold: 50 },
      { name: 'Носки', sold: 50 },
    ];
    expect(names(rankProducts(products)), 'Равные продажи').toEqual(['Кепка', 'Носки', 'Шарф']);
  });
});
