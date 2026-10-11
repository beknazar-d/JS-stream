import { isWeekend, addWorkingDays } from './index.js';

const day = (iso) => new Date(`${iso}T00:00:00Z`);
const iso = (date) => date.toISOString().slice(0, 10);

describe('addWorkingDays: старт и срок', () => {
  it('старт в выходной', () => {
    expect(iso(addWorkingDays(day('2025-03-08'), 1)), 'Суббота плюс 1').toBe('2025-03-10');
    expect(iso(addWorkingDays(day('2025-03-09'), 1)), 'Воскресенье плюс 1').toBe('2025-03-10');
  });

  it('ноль дней — копия старта', () => {
    const start = day('2025-03-08');
    const result = addWorkingDays(start, 0);
    expect(iso(result), 'Ноль дней').toBe('2025-03-08');
    expect(result, 'Другой объект').not.toBe(start);
  });

  it('несколько недель', () => {
    expect(iso(addWorkingDays(day('2025-03-03'), 10)), 'Понедельник плюс 10 рабочих дней').toBe('2025-03-17');
    expect(iso(addWorkingDays(day('2025-03-05'), 15)), 'Среда плюс 15 рабочих дней').toBe('2025-03-26');
  });

  it('переход через месяц и год', () => {
    expect(iso(addWorkingDays(day('2025-12-31'), 1)), '31 декабря 2025 плюс 1').toBe('2026-01-01');
    expect(iso(addWorkingDays(day('2025-12-31'), 1, ['2026-01-01', '2026-01-02'])), 'С праздниками 1 и 2 января').toBe('2026-01-05');
  });

  it('праздник в середине срока и праздник в выходной', () => {
    expect(iso(addWorkingDays(day('2025-03-03'), 3, ['2025-03-05'])), 'Праздник в среду').toBe('2025-03-07');
    expect(iso(addWorkingDays(day('2025-03-07'), 1, ['2025-03-08'])), 'Праздник в субботу ничего не меняет').toBe('2025-03-10');
  });

  it('не меняет переданную дату', () => {
    const start = day('2025-03-07');
    addWorkingDays(start, 5);
    expect(iso(start), 'Старт после вызова').toBe('2025-03-07');
  });
});

describe('addWorkingDays: плохой срок', () => {
  const message = 'Срок должен быть целым числом дней не меньше нуля';
  for (const [title, days] of [['отрицательный', -1], ['дробный', 1.5], ['строка', '2'], ['NaN', NaN], ['не передан', undefined]]) {
    it(`отклоняет: ${title}`, () => {
      expect(() => addWorkingDays(day('2025-03-07'), days), `Срок: ${String(days)}`).toThrow(message);
    });
  }
});

describe('isWeekend: все дни недели', () => {
  it('рабочие дни', () => {
    for (const date of ['2025-03-03', '2025-03-04', '2025-03-05', '2025-03-06', '2025-03-07']) {
      expect(isWeekend(day(date)), `Рабочий день ${date}`).toBe(false);
    }
  });
});
