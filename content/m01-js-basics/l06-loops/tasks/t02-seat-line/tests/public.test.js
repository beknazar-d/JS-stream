import { seatLine } from './index.js';

describe('seatLine: обычные случаи', () => {
  it('нумерует четыре места', () => {
    expect(seatLine(4), 'Зал на 4 места').toBe('1 2 3 4');
  });

  it('одно место без пробелов', () => {
    expect(seatLine(1), 'Зал на 1 место').toBe('1');
  });
});
