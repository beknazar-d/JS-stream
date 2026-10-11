import { productNames, availableProducts, findProduct, hasOutOfStock } from './index.js';

const products = [
  { sku: 'RUN-42', name: 'Кроссовки', price: 4500, quantity: 3 },
  { sku: 'SOCK-07', name: 'Носки', price: 300, quantity: 0 },
];

describe('Каталог: краевые случаи', () => {
  it('findProduct: артикула нет — undefined', () => {
    expect(findProduct(products, 'GLOVE-03'), 'Несуществующий артикул').toBeUndefined();
  });

  it('findProduct возвращает объект, а не массив', () => {
    expect(Array.isArray(findProduct(products, 'RUN-42')), 'Результат — один товар').toBe(false);
  });

  it('availableProducts: нулевой остаток не в наличии', () => {
    expect(availableProducts([products[1]]), 'Только товар с нулевым остатком').toEqual([]);
  });

  it('availableProducts не меняет каталог', () => {
    availableProducts(products);
    expect(products, 'Каталог после фильтрации').toHaveLength(2);
  });

  it('hasOutOfStock: все в наличии', () => {
    expect(hasOutOfStock([products[0]]), 'Нет товаров с нулевым остатком').toBe(false);
  });

  it('hasOutOfStock: пустой каталог', () => {
    expect(hasOutOfStock([]), 'Пустой каталог').toBe(false);
  });

  it('пустой каталог для остальных функций', () => {
    expect(productNames([]), 'Названий нет').toEqual([]);
    expect(availableProducts([]), 'Доступных нет').toEqual([]);
    expect(findProduct([], 'RUN-42'), 'Искать негде').toBeUndefined();
  });
});
