import { makeDate, isoDay, addDays } from './index.js';

describe('makeDate', () => {
  it('январь и декабрь', () => {
    expect(isoDay(makeDate(2025, 1, 1)), 'Январь').toBe('2025-01-01');
    expect(isoDay(makeDate(2025, 12, 1)), 'Декабрь').toBe('2025-12-01');
  });
});

describe('addDays', () => {
  it('отрицательное число дней', () => {
    expect(isoDay(addDays(makeDate(2025, 3, 1), -1)), '1 марта минус день').toBe('2025-02-28');
  });

  it('високосный год', () => {
    expect(isoDay(addDays(makeDate(2024, 2, 28), 1)), '28 февраля 2024 плюс день').toBe('2024-02-29');
  });

  it('переход через год', () => {
    expect(isoDay(addDays(makeDate(2025, 12, 31), 1)), '31 декабря плюс день').toBe('2026-01-01');
  });

  it('ноль дней и длинный срок', () => {
    expect(isoDay(addDays(makeDate(2025, 3, 5), 0)), 'Ноль дней').toBe('2025-03-05');
    expect(isoDay(addDays(makeDate(2025, 1, 1), 365)), 'Плюс 365 дней').toBe('2026-01-01');
  });

  it('возвращает новый объект, исходный не меняется', () => {
    const start = makeDate(2025, 3, 5);
    const result = addDays(start, 10);
    expect(result, 'Результат — другой объект').not.toBe(start);
    expect(isoDay(start), 'Исходная дата').toBe('2025-03-05');
  });
});
