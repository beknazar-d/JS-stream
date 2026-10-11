import { applyDiscount, shippingFor, checkoutTotal } from './index.js';

describe('applyDiscount', () => {
  it('применяет скидку в процентах', () => {
    expect(applyDiscount(2000, 10), 'Скидка 10% с 2000').toBe(1800);
  });

  it('без процента скидки нет', () => {
    expect(applyDiscount(2000), 'Процент не передан').toBe(2000);
  });
});

describe('shippingFor', () => {
  it('платная и бесплатная доставка', () => {
    expect(shippingFor(4999), 'Сумма 4999').toBe(350);
    expect(shippingFor(5000), 'Сумма 5000').toBe(0);
  });
});

describe('checkoutTotal', () => {
  it('сумма с платной доставкой', () => {
    expect(checkoutTotal('1200', '2'), 'Две штуки по 1200').toBe(2750);
  });

  it('скидка уменьшает сумму и может вернуть платную доставку', () => {
    expect(checkoutTotal('6000', '1', 20), 'Товар 6000 с купоном 20%').toBe(5150);
  });

  it('товары ровно на 5000 доставляются бесплатно', () => {
    expect(checkoutTotal('2500', '2'), 'Две штуки по 2500').toBe(5000);
  });
});
