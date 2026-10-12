import { calcFee, defaultSettings, resolveSettings } from './index.js';

describe('resolveSettings: детали', () => {
  it('undefined в переопределении пропускается', () => {
    const result = resolveSettings(defaultSettings, { perKg: undefined, baseFee: 50 });
    expect(result.perKg, 'perKg остался по умолчанию').toBe(10);
    expect(result.baseFee, 'baseFee переопределён').toBe(50);
  });

  it('нулевое значение — настоящее значение', () => {
    expect(resolveSettings(defaultSettings, { baseFee: 0 }).baseFee, 'baseFee равен нулю').toBe(0);
  });

  it('результат — новый объект', () => {
    const result = resolveSettings(defaultSettings, {});
    expect(result, 'Новый объект, не defaults').not.toBe(defaultSettings);
  });

  it('заметку можно переопределить', () => {
    expect(resolveSettings(defaultSettings, { note: 'Урал' }).note, 'Заметка региона').toBe('Урал');
  });
});

describe('calcFee: настройки региона', () => {
  it('использует переопределённые значения', () => {
    const kaliningrad = resolveSettings(defaultSettings, { currency: 'EUR', baseFee: 5, perKg: 2, freeFrom: 100 });
    expect(calcFee(kaliningrad, 4, 50), 'Заказ ниже порога').toBe(13);
    expect(calcFee(kaliningrad, 4, 100), 'Заказ на пороге').toBe(0);
  });
});
