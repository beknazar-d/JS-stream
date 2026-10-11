import { vat, lineTotal, parcelKind, orderNumber, discounted } from './index.js';

describe('Все функции — стрелочные', () => {
  const functions = { vat, lineTotal, parcelKind, orderNumber, discounted };
  for (const [name, fn] of Object.entries(functions)) {
    it(`${name} записана стрелкой`, () => {
      expect(typeof fn, `${name} должна быть функцией`).toBe('function');
      expect('prototype' in fn, `${name} записана через function, а нужна стрелка`).toBe(false);
    });
  }
});

describe('Поведение сохранено', () => {
  it('значение по умолчанию у discounted', () => {
    expect(discounted(2000), 'Процент не передан').toBe(2000);
    expect(discounted(2000, 0), 'Процент 0').toBe(2000);
  });

  it('граница parcelKind', () => {
    expect(parcelKind(3), 'Ровно 3 кг').toBe('Обычная');
    expect(parcelKind(4), '4 кг').toBe('Тяжёлая');
  });

  it('orderNumber не обрезает длинные номера', () => {
    expect(orderNumber(1234567), 'Семизначный номер').toBe('№1234567');
    expect(orderNumber(7), 'Однозначный номер').toBe('№00007');
  });

  it('lineTotal возвращает число', () => {
    expect(lineTotal(10, 0), 'Ноль штук').toBe(0);
  });
});
