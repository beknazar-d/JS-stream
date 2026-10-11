import { isWeekend, addWorkingDays } from './index.js';

const day = (iso) => new Date(`${iso}T00:00:00Z`);
const iso = (date) => date.toISOString().slice(0, 10);

describe('isWeekend', () => {
  it('суббота и воскресенье', () => {
    expect(isWeekend(day('2025-03-08')), 'Суббота').toBe(true);
    expect(isWeekend(day('2025-03-09')), 'Воскресенье').toBe(true);
    expect(isWeekend(day('2025-03-10')), 'Понедельник').toBe(false);
  });
});

describe('addWorkingDays', () => {
  it('пропускает выходные', () => {
    expect(iso(addWorkingDays(day('2025-03-07'), 1)), 'Пятница плюс 1 рабочий день').toBe('2025-03-10');
    expect(iso(addWorkingDays(day('2025-03-07'), 5)), 'Пятница плюс 5 рабочих дней').toBe('2025-03-14');
  });

  it('пропускает праздники', () => {
    expect(iso(addWorkingDays(day('2025-04-30'), 1, ['2025-05-01', '2025-05-02'])), 'Среда плюс 1 рабочий день с майскими праздниками').toBe('2025-05-05');
  });
});
