import { normalizePhone } from './index.js';

describe('normalizePhone: примеры из тикета', () => {
  it('номер с 8 и скобками', () => {
    expect(normalizePhone('8 (999) 123-45-67'), 'Номер, начинающийся с 8').toBe('+79991234567');
  });

  it('номер с +7 и пробелами', () => {
    expect(normalizePhone('+7 999 123 45 67'), 'Номер, начинающийся с +7').toBe('+79991234567');
  });

  it('слишком короткий мусор', () => {
    expect(normalizePhone('123'), 'Строка 123').toBe('');
  });
});
