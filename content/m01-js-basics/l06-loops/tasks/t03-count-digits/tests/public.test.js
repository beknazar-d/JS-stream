import { countDigits } from './index.js';

describe('countDigits', () => {
  it('считает все цифры в коде купона', () => {
    expect(countDigits('SALE-2025'), 'Код «SALE-2025»').toBe(4);
  });

  it('считает цифру в начале строки', () => {
    expect(countDigits('7SALE'), 'Цифра на первой позиции').toBe(1);
  });
});
