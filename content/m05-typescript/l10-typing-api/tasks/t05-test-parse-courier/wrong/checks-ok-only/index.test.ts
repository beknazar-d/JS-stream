import { parseCourier } from './index.js';

describe('parseCourier', () => {
  it('принимает верные данные', () => {
    expect(parseCourier({ id: 7, name: '  Анна ', phone: null }).ok).toBe(true);
    expect(parseCourier({ id: 7, name: 'Анна', phone: '+7 900 000-00-00' }).ok).toBe(true);
  });

  it('id строкой не принимается', () => {
    expect(parseCourier({ id: '7', name: 'Анна', phone: null }).ok).toBe(false);
  });

  it('пустое имя не принимается', () => {
    expect(parseCourier({ id: 7, name: ' ', phone: null }).ok).toBe(false);
  });

  it('поле phone обязательно', () => {
    expect(parseCourier({ id: 7, name: 'Анна' }).ok).toBe(false);
  });
});
