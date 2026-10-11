import { sumPrices, cartTotal, sortPricesAscending } from './index.js';

describe('Корзина', () => {
  it('sumPrices складывает цены', () => {
    expect(sumPrices([1200, 300, 4500]), 'Сумма трёх цен').toBe(6000);
  });

  it('cartTotal учитывает количество', () => {
    const items = [{ price: 300, quantity: 3 }, { price: 1200, quantity: 2 }];
    expect(cartTotal(items), 'Носки ×3 и кепки ×2').toBe(3300);
  });

  it('sortPricesAscending сортирует по возрастанию', () => {
    expect(sortPricesAscending([900, 1200, 300]), 'Цены по возрастанию').toEqual([300, 900, 1200]);
  });
});
