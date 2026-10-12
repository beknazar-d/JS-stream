import { parseCourier } from './index.js';

describe('parseCourier', () => {
  it('принимает курьера и обрезает пробелы', () => {
    expect(parseCourier({ id: 7, name: '  Анна ', phone: null })).toEqual({
      ok: true,
      value: { id: 7, name: 'Анна', phone: null },
    });
  });

  it('id строкой не принимается', () => {
    expect(parseCourier({ id: '7', name: 'Анна', phone: null }).ok).toBe(false);
  });

  it('имя из пробелов не принимается', () => {
    expect(parseCourier({ id: 7, name: '   ', phone: null }).ok).toBe(false);
  });

  it('телефон числом не принимается', () => {
    expect(parseCourier({ id: 7, name: 'Анна', phone: 123 }).ok).toBe(false);
  });
});
