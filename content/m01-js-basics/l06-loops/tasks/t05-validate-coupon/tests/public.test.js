import { validateCoupon } from './index.js';

describe('validateCoupon', () => {
  it('принимает верный код', () => {
    expect(validateCoupon('SALE-2025'), 'Код «SALE-2025»').toBe(true);
    expect(validateCoupon('WINT-0001'), 'Код «WINT-0001»').toBe(true);
  });

  it('отвергает строчные буквы', () => {
    expect(validateCoupon('sale-2025'), 'Код «sale-2025»').toBe(false);
  });

  it('отвергает неверную длину', () => {
    expect(validateCoupon('SALE-202'), 'Короткий код «SALE-202»').toBe(false);
  });

  it('отвергает код без дефиса', () => {
    expect(validateCoupon('SALE_2025'), 'Код с подчёркиванием «SALE_2025»').toBe(false);
  });
});
