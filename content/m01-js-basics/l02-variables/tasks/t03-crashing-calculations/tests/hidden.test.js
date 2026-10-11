import { stockAfterSale, priceWithVat, shippingLabel } from './index.js';

describe('stockAfterSale: другие значения', () => {
  it('работает со строками из формы', () => {
    expect(stockAfterSale('40', '5'), 'Остаток и продажи строками').toBe(35);
  });

  it('вся партия продана', () => {
    expect(stockAfterSale(12, 12), 'Продано всё').toBe(0);
  });
});

describe('priceWithVat: другие значения', () => {
  it('цена строкой из формы даёт число', () => {
    expect(priceWithVat('250'), 'Цена "250" строкой').toBe(300);
    expect(priceWithVat('250'), 'Результат должен быть числом').toBeTypeOf('number');
  });

  it('нулевая цена', () => {
    expect(priceWithVat(0), 'Цена 0').toBe(0);
  });
});

describe('shippingLabel: другие значения', () => {
  it('другой город', () => {
    expect(shippingLabel('Тверь'), 'Этикетка для Твери').toBe('Доставка: Тверь');
  });
});
