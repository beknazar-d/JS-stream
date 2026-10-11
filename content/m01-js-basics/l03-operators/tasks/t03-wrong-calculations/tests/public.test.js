import { applyDiscount, isFreeShipping, averageHandlingMinutes } from './index.js';

describe('applyDiscount', () => {
  it('скидка 0 процентов не меняет цену', () => {
    expect(applyDiscount(1000, 0), 'Цена 1000, скидка 0').toBe(1000);
  });

  it('обычная скидка', () => {
    expect(applyDiscount(1000, 25), 'Цена 1000, скидка 25 процентов').toBe(750);
  });
});

describe('isFreeShipping', () => {
  it('граница 5000 входит в акцию', () => {
    expect(isFreeShipping(5000), 'Заказ ровно на 5000').toBe(true);
    expect(isFreeShipping(4999), 'Заказ на 4999').toBe(false);
  });
});

describe('averageHandlingMinutes', () => {
  it('среднее двух значений', () => {
    expect(averageHandlingMinutes(10, 20), 'Среднее 10 и 20').toBe(15);
  });
});
