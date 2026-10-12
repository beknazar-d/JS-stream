import { makeDiscount } from './index.js';

describe('makeDiscount: краевые случаи', () => {
  it('округляет до целого рубля', () => {
    expect(makeDiscount(15)(999), 'Купон -15% на цену 999 даёт 849.15, а нужно целое').toBe(849);
  });

  it('скидка 0 не меняет цену, скидка 100 даёт ноль', () => {
    expect(makeDiscount(0)(1234), 'Скидка 0%').toBe(1234);
    expect(makeDiscount(100)(1234), 'Скидка 100%').toBe(0);
  });

  it('цена 0 остаётся нулём', () => {
    expect(makeDiscount(10)(0), 'Бесплатный товар').toBe(0);
  });
});

describe('makeDiscount: независимые купоны', () => {
  it('две скидки не мешают друг другу', () => {
    const tenPercent = makeDiscount(10);
    const halfPrice = makeDiscount(50);
    expect(tenPercent(200), 'Купон -10% после создания купона -50%').toBe(180);
    expect(halfPrice(200), 'Купон -50%').toBe(100);
  });

  it('один купон можно применять много раз', () => {
    const coupon = makeDiscount(20);
    expect(coupon(100), 'Первый вызов').toBe(80);
    expect(coupon(500), 'Второй вызов').toBe(400);
    expect(coupon(100), 'Третий вызов повторяет первый').toBe(80);
  });
});
