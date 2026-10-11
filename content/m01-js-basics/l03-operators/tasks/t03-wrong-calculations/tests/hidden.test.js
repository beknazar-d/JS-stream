import { applyDiscount, isFreeShipping, averageHandlingMinutes } from './index.js';

describe('applyDiscount: скидка не передана', () => {
  it('без второго аргумента берётся скидка 10 процентов', () => {
    expect(applyDiscount(1000), 'Скидка не передана').toBe(900);
  });

  it('null означает «скидки нет в данных» и тоже даёт 10 процентов', () => {
    expect(applyDiscount(1000, null), 'Скидка null').toBe(900);
  });

  it('скидка 50 процентов', () => {
    expect(applyDiscount(200, 50), 'Цена 200, скидка 50').toBe(100);
  });

  it('скидка 100 процентов', () => {
    expect(applyDiscount(500, 100), 'Бесплатная выдача по промокоду').toBe(0);
  });
});

describe('isFreeShipping: другие суммы', () => {
  it('сумма выше порога', () => {
    expect(isFreeShipping(5001), 'Заказ на 5001').toBe(true);
    expect(isFreeShipping(12000), 'Заказ на 12000').toBe(true);
  });

  it('нулевая сумма', () => {
    expect(isFreeShipping(0), 'Пустая корзина').toBe(false);
  });
});

describe('averageHandlingMinutes: другие значения', () => {
  it('одинаковые значения', () => {
    expect(averageHandlingMinutes(30, 30), 'Среднее 30 и 30').toBe(30);
  });

  it('нули и нечётная сумма', () => {
    expect(averageHandlingMinutes(0, 0), 'Среднее 0 и 0').toBe(0);
    expect(averageHandlingMinutes(7, 10), 'Среднее 7 и 10').toBe(8.5);
  });
});
