import { calcFee, defaultSettings, publicSettings, resolveSettings } from './index.js';

describe('resolveSettings', () => {
  it('регион переопределяет часть настроек', () => {
    const urals = resolveSettings(defaultSettings, { perKg: 20 });
    expect(urals, 'Настройки Урала').toEqual({ baseFee: 100, perKg: 20, freeFrom: 5000, currency: 'RUB', note: 'общий тариф' });
  });

  it('пустое переопределение даёт общие настройки', () => {
    expect(resolveSettings(defaultSettings, {}), 'Пустое переопределение').toEqual(defaultSettings);
  });

  it('общие настройки не меняются', () => {
    const before = { ...defaultSettings };
    resolveSettings(defaultSettings, { baseFee: 1, currency: 'EUR' });
    expect(defaultSettings, 'Общие настройки после расчёта').toEqual(before);
  });
});

describe('publicSettings', () => {
  it('отдаёт только три публичных поля', () => {
    expect(publicSettings(defaultSettings), 'Публичные настройки').toStrictEqual({ baseFee: 100, perKg: 10, currency: 'RUB' });
  });
});

describe('calcFee', () => {
  it('считает базовую цену и вес', () => {
    expect(calcFee(defaultSettings, 3, 1000), 'Заказ на 1000, 3 кг').toBe(130);
  });

  it('бесплатная доставка от порога', () => {
    expect(calcFee(defaultSettings, 3, 5000), 'Заказ ровно на порог').toBe(0);
    expect(calcFee(defaultSettings, 3, 4999), 'Заказ на рубль меньше порога').toBe(130);
  });
});
