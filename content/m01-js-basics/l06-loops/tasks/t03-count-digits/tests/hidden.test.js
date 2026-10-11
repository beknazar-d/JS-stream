import { countDigits } from './index.js';

describe('countDigits: позиции цифр', () => {
  it('цифра на последней позиции', () => {
    expect(countDigits('SALE7'), 'Цифра на последней позиции').toBe(1);
  });

  it('строка целиком из цифр', () => {
    expect(countDigits('1234567'), 'Семь цифр подряд').toBe(7);
  });

  it('нуль — это цифра', () => {
    expect(countDigits('A0B0'), 'Два нуля в коде').toBe(2);
  });
});

describe('countDigits: пустой и неподходящий ввод', () => {
  it('пустая строка и строка без цифр', () => {
    expect(countDigits(''), 'Пустая строка').toBe(0);
    expect(countDigits('SALE-NEW'), 'Строка без цифр').toBe(0);
  });

  it('не строка — ноль', () => {
    expect(countDigits(null), 'null вместо кода').toBe(0);
    expect(countDigits(undefined), 'undefined вместо кода').toBe(0);
    expect(countDigits(2025), 'Число вместо строки').toBe(0);
  });
});
