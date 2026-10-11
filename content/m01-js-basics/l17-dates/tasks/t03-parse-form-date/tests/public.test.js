import { parseFormDate } from './index.js';

describe('parseFormDate', () => {
  it('разбирает обычную дату', () => {
    expect(parseFormDate('05.03.2025').toISOString(), 'Дата 05.03.2025').toBe('2025-03-05T00:00:00.000Z');
  });

  it('возвращает null для текста', () => {
    expect(parseFormDate('abc'), 'Текст вместо даты').toBeNull();
  });
});
