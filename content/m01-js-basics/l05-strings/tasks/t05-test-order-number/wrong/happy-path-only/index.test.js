import { formatOrderNumber } from './index.js';

describe('formatOrderNumber', () => {
  it('собирает номер из четырёх цифр', () => {
    expect(formatOrderNumber(1234, 2024), 'Заказ 1234 за 2024 год').toBe('ORD-2024-1234');
  });

  it('собирает номер другого года', () => {
    expect(formatOrderNumber(5678, 2023), 'Заказ 5678 за 2023 год').toBe('ORD-2023-5678');
  });
});
