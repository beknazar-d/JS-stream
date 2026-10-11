import { stockAfterSale, priceWithVat, shippingLabel } from './index.js';

describe('stockAfterSale', () => {
  it('вычитает проданное из остатка', () => {
    expect(stockAfterSale(40, 5), 'Остаток 40, продано 5').toBe(35);
  });
});

describe('priceWithVat', () => {
  it('добавляет НДС 20 процентов', () => {
    expect(priceWithVat(250), 'Цена 250 рублей').toBe(300);
    expect(priceWithVat(100), 'Цена 100 рублей').toBe(120);
  });
});

describe('shippingLabel', () => {
  it('подписывает этикетку городом', () => {
    expect(shippingLabel('Казань'), 'Этикетка для Казани').toBe('Доставка: Казань');
  });
});
