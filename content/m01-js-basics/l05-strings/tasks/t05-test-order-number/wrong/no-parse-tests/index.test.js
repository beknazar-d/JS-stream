import { formatOrderNumber } from './index.js';

describe('formatOrderNumber', () => {
  it('дополняет короткий номер нулями', () => {
    expect(formatOrderNumber(7, 2024), 'Заказ 7 за 2024 год').toBe('ORD-2024-0007');
  });

  it('не обрезает длинный номер', () => {
    expect(formatOrderNumber(12345, 2025), 'Заказ 12345 за 2025 год').toBe('ORD-2025-12345');
  });
});
