import { formatAddress } from './index.js';

describe('formatAddress', () => {
  it('собирает полный адрес', () => {
    const address = { city: 'Казань', street: 'Баумана', house: '5' };
    expect(formatAddress(address), 'Адрес со всеми полями').toBe('Казань, Баумана, 5');
  });

  it('вместо отсутствующего дома пишет «б/н»', () => {
    expect(formatAddress({ city: 'Казань', street: 'Баумана' }), 'Адрес без дома').toBe('Казань, Баумана, б/н');
  });

  it('без адреса не падает', () => {
    expect(formatAddress(undefined), 'Самовывоз, адреса нет').toBe('Адрес не указан');
  });
});
