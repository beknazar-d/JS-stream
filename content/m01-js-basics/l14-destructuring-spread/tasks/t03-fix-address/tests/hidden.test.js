import { formatAddress } from './index.js';

describe('formatAddress: скрытые случаи', () => {
  it('адрес null из ответа сервера', () => {
    expect(formatAddress(null), 'Адрес равен null').toBe('Адрес не указан');
  });

  it('вызов без аргументов', () => {
    expect(formatAddress(), 'Функцию вызвали без аргумента').toBe('Адрес не указан');
  });

  it('не меняет переданный объект', () => {
    const address = { city: 'Самара', street: 'Ленинская' };
    formatAddress(address);
    expect(address, 'Исходный адрес после вызова').toEqual({ city: 'Самара', street: 'Ленинская' });
  });

  it('номер дома из нескольких символов сохраняется', () => {
    expect(formatAddress({ city: 'Пермь', street: 'Петропавловская', house: '12к2' }), 'Дом 12к2').toBe('Пермь, Петропавловская, 12к2');
  });
});
