import { makeDate, isoDay, addDays } from './index.js';

describe('Помощники для дат', () => {
  it('makeDate: полночь UTC нужного дня', () => {
    expect(makeDate(2025, 3, 5).toISOString(), 'makeDate(2025, 3, 5)').toBe('2025-03-05T00:00:00.000Z');
  });

  it('isoDay: только день', () => {
    expect(isoDay(makeDate(2025, 12, 31)), 'isoDay для 31 декабря').toBe('2025-12-31');
  });

  it('addDays: переход через месяц', () => {
    expect(isoDay(addDays(makeDate(2025, 1, 31), 1)), '31 января плюс день').toBe('2025-02-01');
  });
});
