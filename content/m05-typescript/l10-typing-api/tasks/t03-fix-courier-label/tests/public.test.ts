import { courierLabel, isCourier } from './index.js';

describe('isCourier', () => {
  it('принимает курьера с телефоном и без', () => {
    expect(isCourier({ id: 7, name: 'Анна', phone: '+7 900 000-00-00' }), 'Курьер с телефоном').toBe(true);
    expect(isCourier({ id: 7, name: 'Анна', phone: null }), 'Курьер без телефона (null)').toBe(true);
  });

  it('отклоняет null и не объекты', () => {
    expect(isCourier(null), 'null не курьер').toBe(false);
    expect(isCourier('Анна'), 'Строка не курьер').toBe(false);
  });
});

describe('courierLabel', () => {
  it('подпись с телефоном', () => {
    expect(courierLabel('{"id":7,"name":"Анна","phone":"+7 900 000-00-00"}')).toBe('Анна (+7 900 000-00-00)');
  });

  it('подпись без телефона', () => {
    expect(courierLabel('{"id":7,"name":"Анна","phone":null}')).toBe('Анна (телефон не указан)');
  });
});
