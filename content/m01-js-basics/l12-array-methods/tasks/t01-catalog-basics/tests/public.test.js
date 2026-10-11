import { productNames, availableProducts, findProduct, hasOutOfStock } from './index.js';

const products = [
  { sku: 'RUN-42', name: 'Кроссовки', price: 4500, quantity: 3 },
  { sku: 'SOCK-07', name: 'Носки', price: 300, quantity: 0 },
  { sku: 'CAP-01', name: 'Кепка', price: 1200, quantity: 8 },
];

describe('Каталог', () => {
  it('productNames возвращает названия', () => {
    expect(productNames(products), 'Названия товаров').toEqual(['Кроссовки', 'Носки', 'Кепка']);
  });

  it('availableProducts оставляет товары в наличии', () => {
    const names = availableProducts(products).map((product) => product.name);
    expect(names, 'Товары с остатком больше нуля').toEqual(['Кроссовки', 'Кепка']);
  });

  it('findProduct находит товар по артикулу', () => {
    expect(findProduct(products, 'CAP-01'), 'Товар CAP-01').toEqual(products[2]);
  });

  it('hasOutOfStock замечает нулевой остаток', () => {
    expect(hasOutOfStock(products), 'Носки закончились').toBe(true);
  });
});
