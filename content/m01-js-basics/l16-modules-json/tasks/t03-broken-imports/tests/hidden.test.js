import { invoiceLine } from './index.js';
import { formatPrice } from './money.js';
import { calcTax } from './tax.js';

describe('invoiceLine: другие данные', () => {
  it('НДС считается от суммы позиции, а не от одной штуки', () => {
    expect(invoiceLine('Фильтры', 300, 10), 'Фильтры 300 × 10: сумма 3000, НДС 600').toBe('Фильтры × 10: 3000.00 ₽, НДС 600.00 ₽');
  });

  it('копейки сохраняются', () => {
    expect(invoiceLine('Кружка', 199.99, 3), 'Кружка 199.99 × 3').toBe('Кружка × 3: 599.97 ₽, НДС 119.99 ₽');
  });

  it('одна штука', () => {
    expect(invoiceLine('Чай', 100, 1), 'Чай 100 × 1').toBe('Чай × 1: 100.00 ₽, НДС 20.00 ₽');
  });
});

describe('Экспорты остальных файлов не изменены', () => {
  it('money.js отдаёт formatPrice по имени', () => {
    expect(typeof formatPrice, 'Экспорт formatPrice из money.js').toBe('function');
    expect(formatPrice(5), 'formatPrice(5)').toBe('5.00 ₽');
  });

  it('tax.js отдаёт calcTax по имени', () => {
    expect(typeof calcTax, 'Экспорт calcTax из tax.js').toBe('function');
    expect(calcTax(100), 'calcTax(100)').toBe(20);
  });
});
