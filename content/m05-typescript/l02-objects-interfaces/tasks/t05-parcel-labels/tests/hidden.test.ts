import { formatLabel, summarize } from './index.js';
import type { Parcel } from './index.js';

const base: Parcel = { id: 1, recipient: 'Олег', address: { city: 'Пермь', street: 'Мира 9' }, weightKg: 1 };

describe('formatLabel: комбинации необязательных полей', () => {
  it('только заметка', () => {
    expect(formatLabel({ ...base, note: 'оставить у двери' }), 'Заметка без хрупкости').toBe('№1 Олег, Пермь, Мира 9 — 1 кг — оставить у двери');
  });
  it('только хрупкость', () => {
    expect(formatLabel({ ...base, fragile: true }), 'Хрупкая без заметки').toBe('№1 Олег, Пермь, Мира 9 — 1 кг — ХРУПКОЕ');
  });
  it('fragile равно false не печатается', () => {
    expect(formatLabel({ ...base, fragile: false }), 'Явно нехрупкая').toBe('№1 Олег, Пермь, Мира 9 — 1 кг');
  });
  it('только квартира', () => {
    expect(formatLabel({ ...base, address: { city: 'Пермь', street: 'Мира 9', apartment: 15 } }), 'Квартира без остального').toBe('№1 Олег, Пермь, Мира 9, кв. 15 — 1 кг');
  });
});

describe('summarize: хрупкость', () => {
  it('без поля fragile посылка не хрупкая', () => {
    expect(summarize([base, base]).fragileCount, 'Две посылки без fragile').toBe(0);
  });
  it('fragile равно false не считается', () => {
    expect(summarize([{ ...base, fragile: false }]).fragileCount, 'Явно нехрупкая').toBe(0);
  });
  it('считает только true', () => {
    const parcels: Parcel[] = [{ ...base, fragile: true }, { ...base, fragile: false }, { ...base, fragile: true }, base];
    expect(summarize(parcels), 'Партия из четырёх').toEqual({ count: 4, totalWeightKg: 4, fragileCount: 2 });
  });
  it('вес суммируется точно', () => {
    expect(summarize([{ ...base, weightKg: 0.5 }, { ...base, weightKg: 0.25 }]).totalWeightKg, 'Вес 0.5 и 0.25').toBe(0.75);
  });
});
