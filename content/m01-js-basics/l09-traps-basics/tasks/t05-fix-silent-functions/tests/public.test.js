import { lineTotal, withShipping, stockLabel } from './index.js';

describe('lineTotal', () => {
  it('сумма строки заказа', () => {
    expect(lineTotal(100, 3), '3 штуки по 100').toBe(300);
  });
});

describe('withShipping', () => {
  it('доставка по умолчанию', () => {
    expect(withShipping(1000), 'Доставка не указана').toBe(1350);
  });
});

describe('stockLabel', () => {
  it('подпись остатка', () => {
    expect(stockLabel(5), 'Остаток 5').toBe('Остаток: 5 шт.');
  });
});
