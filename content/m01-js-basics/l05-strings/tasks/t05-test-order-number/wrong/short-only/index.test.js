import { formatOrderNumber, parseOrderNumber } from './index.js';

describe('formatOrderNumber', () => {
  it('дополняет короткий номер нулями', () => {
    expect(formatOrderNumber(7, 2024), 'Заказ 7 за 2024 год').toBe('ORD-2024-0007');
  });
});

describe('parseOrderNumber', () => {
  it('возвращает порядковый номер числом', () => {
    expect(parseOrderNumber('ORD-2024-0042'), 'Номер ORD-2024-0042').toBe(42);
  });
});
