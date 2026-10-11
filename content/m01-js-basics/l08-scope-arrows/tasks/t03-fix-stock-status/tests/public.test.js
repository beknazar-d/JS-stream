import { stockStatus } from './index.js';

describe('stockStatus', () => {
  it('много товара', () => {
    expect(stockStatus(50), 'Остаток 50').toBe('В наличии');
  });

  it('мало товара', () => {
    expect(stockStatus(5), 'Остаток 5').toBe('Мало');
  });

  it('товара нет', () => {
    expect(stockStatus(0), 'Остаток 0').toBe('Нет в наличии');
  });
});
