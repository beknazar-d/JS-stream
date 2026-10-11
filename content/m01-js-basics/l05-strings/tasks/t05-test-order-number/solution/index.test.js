import { formatOrderNumber, parseOrderNumber } from './index.js';

describe('formatOrderNumber', () => {
  it('дополняет короткий номер нулями до четырёх цифр', () => {
    expect(formatOrderNumber(7, 2024), 'Заказ 7 за 2024 год').toBe('ORD-2024-0007');
  });

  it('четырёхзначный номер остаётся без изменений', () => {
    expect(formatOrderNumber(1234, 2024), 'Заказ 1234 за 2024 год').toBe('ORD-2024-1234');
  });

  it('не обрезает номер длиннее четырёх цифр', () => {
    expect(formatOrderNumber(12345, 2025), 'Заказ 12345 за 2025 год').toBe('ORD-2025-12345');
  });
});

describe('parseOrderNumber', () => {
  it('возвращает порядковый номер числом', () => {
    expect(parseOrderNumber('ORD-2024-0042'), 'Номер ORD-2024-0042').toBe(42);
  });

  it('разбирает номер длиннее четырёх цифр', () => {
    expect(parseOrderNumber('ORD-2025-12345'), 'Номер ORD-2025-12345').toBe(12345);
  });
});
