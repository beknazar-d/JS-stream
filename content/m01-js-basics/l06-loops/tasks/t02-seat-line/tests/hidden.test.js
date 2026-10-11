import { seatLine } from './index.js';

describe('seatLine: краевые случаи', () => {
  it('нулевой зал даёт пустую строку', () => {
    expect(seatLine(0), 'Зал без мест').toBe('');
  });

  it('двузначные номера', () => {
    expect(seatLine(11), 'Зал на 11 мест').toBe('1 2 3 4 5 6 7 8 9 10 11');
  });

  it('нет пробела в конце и в начале', () => {
    const line = seatLine(3);
    expect(line.startsWith(' '), 'Пробел в начале строки для зала на 3 места').toBe(false);
    expect(line.endsWith(' '), 'Пробел в конце строки для зала на 3 места').toBe(false);
  });
});
