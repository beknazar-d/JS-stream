import { parseFormDate } from './index.js';

describe('parseFormDate: формат', () => {
  it('день и месяц из одной цифры', () => {
    expect(parseFormDate('5.3.2025').toISOString(), 'Дата 5.3.2025').toBe('2025-03-05T00:00:00.000Z');
  });

  it('граничные месяцы', () => {
    expect(parseFormDate('01.01.2025').toISOString(), 'Январь').toBe('2025-01-01T00:00:00.000Z');
    expect(parseFormDate('31.12.2025').toISOString(), 'Декабрь').toBe('2025-12-31T00:00:00.000Z');
  });

  it('пустая строка и лишние части', () => {
    expect(parseFormDate(''), 'Пустая строка').toBeNull();
    expect(parseFormDate('05.03'), 'Нет года').toBeNull();
    expect(parseFormDate('05.03.2025.1'), 'Лишняя часть').toBeNull();
  });
});

describe('parseFormDate: несуществующие даты', () => {
  it('нет такого дня в месяце', () => {
    expect(parseFormDate('31.04.2025'), '31 апреля').toBeNull();
    expect(parseFormDate('31.02.2025'), '31 февраля').toBeNull();
    expect(parseFormDate('00.03.2025'), 'Нулевой день').toBeNull();
  });

  it('високосный год', () => {
    expect(parseFormDate('29.02.2024').toISOString(), '29 февраля 2024').toBe('2024-02-29T00:00:00.000Z');
    expect(parseFormDate('29.02.2025'), '29 февраля 2025').toBeNull();
  });

  it('нет такого месяца', () => {
    expect(parseFormDate('05.13.2025'), 'Месяц 13').toBeNull();
    expect(parseFormDate('05.00.2025'), 'Месяц 0').toBeNull();
  });

  it('нечисловые части', () => {
    expect(parseFormDate('ab.cd.efgh'), 'Буквы вместо чисел').toBeNull();
    expect(parseFormDate('05.03.20x5'), 'Буква в годе').toBeNull();
  });
});
