import { parseCourier } from './index.js';

describe('parseCourier: верные данные', () => {
  it('принимает курьера с телефоном', () => {
    expect(parseCourier({ id: 7, name: 'Анна', phone: '+7 900 000-00-00' })).toEqual({
      ok: true,
      value: { id: 7, name: 'Анна', phone: '+7 900 000-00-00' },
    });
  });

  it('принимает курьера без телефона (null)', () => {
    expect(parseCourier({ id: 7, name: 'Анна', phone: null })).toEqual({
      ok: true,
      value: { id: 7, name: 'Анна', phone: null },
    });
  });

  it('обрезает пробелы вокруг имени', () => {
    expect(parseCourier({ id: 7, name: '  Анна ', phone: null })).toEqual({
      ok: true,
      value: { id: 7, name: 'Анна', phone: null },
    });
  });
});

describe('parseCourier: отказы', () => {
  it('не объект', () => {
    expect(parseCourier(null).ok, 'null').toBe(false);
    expect(parseCourier('Анна').ok, 'строка').toBe(false);
  });

  it('id строкой не принимается', () => {
    expect(parseCourier({ id: '7', name: 'Анна', phone: null }).ok, 'Строка "7"').toBe(false);
  });

  it('id: ноль, дробь и отрицательное', () => {
    for (const id of [0, 1.5, -3]) {
      expect(parseCourier({ id, name: 'Анна', phone: null }).ok, `id ${id}`).toBe(false);
    }
  });

  it('имя из пробелов и пустое имя', () => {
    expect(parseCourier({ id: 7, name: '   ', phone: null }).ok, 'Пробелы').toBe(false);
    expect(parseCourier({ id: 7, name: '', phone: null }).ok, 'Пустая строка').toBe(false);
  });

  it('phone обязателен: ни undefined, ни число', () => {
    expect(parseCourier({ id: 7, name: 'Анна' }).ok, 'Поля phone нет').toBe(false);
    expect(parseCourier({ id: 7, name: 'Анна', phone: 123 }).ok, 'Телефон числом').toBe(false);
  });
});
