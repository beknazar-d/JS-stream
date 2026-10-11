import { invoiceLine } from './index.js';

describe('invoiceLine', () => {
  it('собирает строку счёта', () => {
    expect(invoiceLine('Кофе', 1200, 2), 'Кофе, цена 1200, количество 2').toBe('Кофе × 2: 2400.00 ₽, НДС 480.00 ₽');
  });
});
