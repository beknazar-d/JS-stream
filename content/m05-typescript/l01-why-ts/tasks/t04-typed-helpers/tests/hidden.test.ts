import { averageMinutes, countPaid, formatPrice } from './index.js';

describe('averageMinutes: ещё случаи', () => {
  it('один элемент', () => {
    expect(averageMinutes([42]), 'Одна доставка').toBe(42);
  });
  it('целое среднее', () => {
    expect(averageMinutes([20, 40]), 'Среднее 30').toBe(30);
  });
  it('никогда не возвращает NaN', () => {
    expect(Number.isNaN(averageMinutes([])), 'Пустой список').toBe(false);
  });
});

describe('countPaid: ещё случаи', () => {
  it('пустой список', () => {
    expect(countPaid([]), 'Нет заказов').toBe(0);
  });
  it('все не оплачены', () => {
    expect(countPaid([false, false]), 'Нет оплаченных').toBe(0);
  });
  it('все оплачены', () => {
    expect(countPaid([true, true, true]), 'Все оплачены').toBe(3);
  });
});

describe('formatPrice: ещё случаи', () => {
  it('дробная цена', () => {
    expect(formatPrice(99.5, 'USD'), 'Цена 99.5').toBe('99.50 USD');
  });
  it('ноль', () => {
    expect(formatPrice(0, 'EUR'), 'Цена 0').toBe('0.00 EUR');
  });
  it('результат — строка', () => {
    expect(formatPrice(10, 'RUB'), 'Тип результата').toBeTypeOf('string');
  });
});
