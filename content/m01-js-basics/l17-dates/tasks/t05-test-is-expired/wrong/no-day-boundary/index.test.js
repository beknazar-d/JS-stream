import { isExpired } from './index.js';

describe('isExpired', () => {
  it('далеко до окончания и далеко после', () => {
    expect(isExpired('2025-03-05', new Date('2025-01-01T00:00:00Z')), 'Два месяца до конца').toBe(false);
    expect(isExpired('2025-03-05', new Date('2025-09-01T00:00:00Z')), 'Полгода после конца').toBe(true);
  });

  it('плохая дата', () => {
    expect(() => isExpired('abc', new Date('2025-03-01T00:00:00Z')), 'Текст «abc»').toThrow('Некорректная дата окончания');
  });
});
