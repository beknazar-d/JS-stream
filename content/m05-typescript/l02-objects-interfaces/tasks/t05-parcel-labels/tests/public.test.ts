import { formatLabel, summarize } from './index.js';
import type { Parcel } from './index.js';

const full: Parcel = {
  id: 12,
  recipient: 'Анна Соколова',
  address: { city: 'Казань', street: 'Баумана 5', apartment: 7 },
  weightKg: 2.5,
  fragile: true,
  note: 'позвонить за час',
};
const plain: Parcel = {
  id: 13,
  recipient: 'Пётр Лис',
  address: { city: 'Самара', street: 'Ленина 1' },
  weightKg: 10,
};

describe('formatLabel', () => {
  it('полная наклейка', () => {
    expect(formatLabel(full), 'Посылка со всеми полями').toBe('№12 Анна Соколова, Казань, Баумана 5, кв. 7 — 2.5 кг — ХРУПКОЕ — позвонить за час');
  });
  it('минимальная наклейка', () => {
    expect(formatLabel(plain), 'Посылка без квартиры, хрупкости и заметки').toBe('№13 Пётр Лис, Самара, Ленина 1 — 10 кг');
  });
});

describe('summarize', () => {
  it('пустая партия', () => {
    expect(summarize([]), 'Нет посылок').toEqual({ count: 0, totalWeightKg: 0, fragileCount: 0 });
  });
  it('партия из двух посылок', () => {
    expect(summarize([full, plain]), 'Две посылки').toEqual({ count: 2, totalWeightKg: 12.5, fragileCount: 1 });
  });
});
