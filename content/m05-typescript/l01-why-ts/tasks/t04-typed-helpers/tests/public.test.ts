import { averageMinutes, countPaid, formatPrice } from './index.js';

describe('averageMinutes', () => {
  it('среднее с округлением до десятых', () => {
    expect(averageMinutes([10, 15, 16]), 'Среднее для 10, 15, 16').toBe(13.7);
  });
  it('пустой список', () => {
    expect(averageMinutes([]), 'Нет доставок').toBe(0);
  });
});

describe('countPaid', () => {
  it('считает true', () => {
    expect(countPaid([true, false, true]), 'Два оплаченных заказа').toBe(2);
  });
});

describe('formatPrice', () => {
  it('две цифры после запятой и валюта', () => {
    expect(formatPrice(1200, 'RUB'), 'Цена 1200 RUB').toBe('1200.00 RUB');
  });
});
