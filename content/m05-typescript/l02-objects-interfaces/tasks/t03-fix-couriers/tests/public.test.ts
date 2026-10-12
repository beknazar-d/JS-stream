import { couriers, contactLine } from './index.js';

describe('Данные курьеров', () => {
  it('у Ольги есть транспорт', () => {
    const olga = couriers.find((c) => c.id === 2);
    expect(olga?.vehicle, 'Транспорт Ольги').toBe('самокат');
  });
  it('у Петра телефон в поле phone', () => {
    const petr = couriers.find((c) => c.id === 3);
    expect(petr?.phone, 'Телефон Петра').toBe('+7 900 000-00-02');
  });
});

describe('contactLine', () => {
  it('курьер с телефоном', () => {
    expect(contactLine(couriers[0]), 'Иван с телефоном').toBe('Иван Петров, тел.: +7 900 000-00-01');
  });
});
