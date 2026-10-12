import { courierLabel, isCourier } from './index.js';

describe('isCourier: поля', () => {
  it('id должен быть числом', () => {
    expect(isCourier({ id: '7', name: 'Анна', phone: null }), 'id строкой не подходит').toBe(false);
  });

  it('name должен быть непустой строкой', () => {
    expect(isCourier({ id: 7, name: '', phone: null }), 'Пустое имя').toBe(false);
    expect(isCourier({ id: 7, name: 5, phone: null }), 'Имя числом').toBe(false);
  });

  it('phone обязателен, пусть и null', () => {
    expect(isCourier({ id: 7, name: 'Анна' }), 'Поле phone отсутствует').toBe(false);
    expect(isCourier({ id: 7, name: 'Анна', phone: 123 }), 'Телефон числом').toBe(false);
  });
});

describe('courierLabel: плохие данные', () => {
  const fallback = 'Курьер не определён';

  it('сломанный JSON не бросает исключение', () => {
    expect(courierLabel('{"id":7,'), 'Обрезанный JSON').toBe(fallback);
    expect(courierLabel(''), 'Пустая строка').toBe(fallback);
  });

  it('JSON без курьера', () => {
    expect(courierLabel('null'), 'Текст null').toBe(fallback);
    expect(courierLabel('[]'), 'Пустой массив').toBe(fallback);
    expect(courierLabel('{"id":7,"name":"Анна"}'), 'Нет поля phone').toBe(fallback);
  });
});
