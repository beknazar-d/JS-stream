import { describeLine } from './index.js';

describe('describeLine', () => {
  it('собирает строку из частей', () => {
    expect(describeLine('Кофе', 2, 1200), 'Кофе, 2 штуки по 1200').toBe('Кофе: 2 шт. × 1200 ₽ (RUB)');
  });
});
