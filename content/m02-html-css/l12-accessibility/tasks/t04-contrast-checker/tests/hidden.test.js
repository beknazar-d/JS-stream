import { contrastRatio, meetsAA, isLargeText } from './index.js';

describe('порядок аргументов и регистр', () => {
  it('порядок аргументов не важен', () => {
    expect(contrastRatio('#ffffff', '#767676'), 'Светлый первым').toBeCloseTo(contrastRatio('#767676', '#ffffff'), 8);
    expect(contrastRatio('#ffffff', '#000000'), 'Белый на чёрном').toBeCloseTo(21, 5);
  });

  it('заглавные буквы в записи цвета', () => {
    expect(contrastRatio('#FFFFFF', '#0B3D91'), 'Заглавные буквы').toBeCloseTo(contrastRatio('#ffffff', '#0b3d91'), 8);
  });
});

describe('короткая запись #rgb', () => {
  it('#fff совпадает с #ffffff', () => {
    expect(contrastRatio('#000', '#fff'), '#000 на #fff').toBeCloseTo(21, 5);
    expect(contrastRatio('#abc', '#ffffff'), '#abc').toBeCloseTo(contrastRatio('#aabbcc', '#ffffff'), 8);
  });
});

describe('некорректные цвета', () => {
  for (const bad of ['red', '#12', '#gggggg', '#12345', 'ffffff', '', null, undefined, 123]) {
    it(`бросает ошибку для ${JSON.stringify(bad) ?? String(bad)}`, () => {
      expect(() => contrastRatio(bad, '#ffffff'), `Некорректный цвет ${String(bad)} первым аргументом`).toThrow(/Некорректный цвет/);
      expect(() => contrastRatio('#ffffff', bad), `Некорректный цвет ${String(bad)} вторым аргументом`).toThrow(/Некорректный цвет/);
    });
  }

  it('meetsAA тоже бросает ошибку, а не отвечает false', () => {
    expect(() => meetsAA('#12', '#ffffff', false), 'meetsAA с опечаткой в цвете').toThrow(/Некорректный цвет/);
  });
});

describe('границы порогов', () => {
  it('#767676 на белом проходит, #777777 нет', () => {
    expect(meetsAA('#767676', '#ffffff', false), '#767676 — первый серый, который проходит').toBe(true);
    expect(meetsAA('#777777', '#fff', false), '#777777 не проходит').toBe(false);
  });

  it('белый на оранжевом #e8590c не проходит для обычного текста', () => {
    expect(meetsAA('#ffffff', '#e8590c', false), 'Белый на оранжевом, обычный текст').toBe(false);
    expect(meetsAA('#ffffff', '#e8590c', true), 'Белый на оранжевом, крупный текст').toBe(true);
  });

  it('границы крупного текста', () => {
    expect(isLargeText(23.9, false), '23,9px обычным').toBe(false);
    expect(isLargeText(18.67, true), '18,67px жирным').toBe(true);
    expect(isLargeText(18, true), '18px жирным').toBe(false);
    expect(isLargeText(24, true), '24px жирным').toBe(true);
  });
});
