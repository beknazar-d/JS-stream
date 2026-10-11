import { validateCoupon } from './index.js';

describe('validateCoupon: посторонние символы', () => {
  it('буква вместо цифры', () => {
    expect(validateCoupon('SALE-20X5'), 'Буква среди цифр').toBe(false);
  });

  it('цифра вместо буквы', () => {
    expect(validateCoupon('1ALE-2025'), 'Цифра на первой позиции').toBe(false);
    expect(validateCoupon('SAL3-2025'), 'Цифра на четвёртой позиции').toBe(false);
  });

  it('пробелы и русские буквы', () => {
    expect(validateCoupon('SALE-2025 '), 'Пробел в конце').toBe(false);
    expect(validateCoupon('САЛЕ-2025'), 'Кириллические буквы').toBe(false);
  });

  it('дефис не на своём месте', () => {
    expect(validateCoupon('SAL-E2025'), 'Дефис на позиции 3').toBe(false);
    expect(validateCoupon('SALE-2-25'), 'Второй дефис среди цифр').toBe(false);
  });
});

describe('validateCoupon: длина', () => {
  it('лишний символ в конце', () => {
    expect(validateCoupon('SALE-20255'), 'Пять цифр').toBe(false);
  });

  it('пустая строка', () => {
    expect(validateCoupon(''), 'Пустое поле').toBe(false);
  });
});

describe('validateCoupon: не строка', () => {
  it('число, null и undefined', () => {
    expect(validateCoupon(null), 'null вместо кода').toBe(false);
    expect(validateCoupon(undefined), 'Поле не передано').toBe(false);
    expect(validateCoupon(202512345), 'Число вместо строки').toBe(false);
  });
});
