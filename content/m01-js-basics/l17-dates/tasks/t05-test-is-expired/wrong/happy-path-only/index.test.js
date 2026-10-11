import { isExpired } from './index.js';

describe('isExpired', () => {
  it('действует в середине срока', () => {
    expect(isExpired('2025-03-05', new Date('2025-03-01T12:00:00Z')), 'За четыре дня до конца').toBe(false);
  });

  it('истёк давно', () => {
    expect(isExpired('2025-03-05', new Date('2025-06-01T12:00:00Z')), 'Спустя три месяца').toBe(true);
  });
});
