import { contrastRatio, meetsAA, isLargeText } from './index.js';

describe('contrastRatio: основные значения', () => {
  it('чёрный на белом даёт 21', () => {
    expect(contrastRatio('#000000', '#ffffff'), 'Чёрный на белом').toBeCloseTo(21, 5);
  });

  it('одинаковые цвета дают 1', () => {
    expect(contrastRatio('#336699', '#336699'), 'Цвет на самом себе').toBeCloseTo(1, 5);
  });

  it('серый #767676 на белом около 4,54', () => {
    expect(contrastRatio('#767676', '#ffffff'), 'Серый #767676 на белом').toBeCloseTo(4.54, 2);
  });

  it('тёмно-синий текст на белом', () => {
    expect(contrastRatio('#0b3d91', '#ffffff'), 'Тёмно-синий #0b3d91 на белом').toBeCloseTo(10.04, 2);
  });
});

describe('meetsAA и isLargeText', () => {
  it('чёрный на белом проходит', () => {
    expect(meetsAA('#000000', '#ffffff', false), 'Чёрный на белом').toBe(true);
  });

  it('светло-серый #777777 не проходит для обычного текста', () => {
    expect(meetsAA('#777777', '#ffffff', false), '#777777 на белом, обычный текст').toBe(false);
  });

  it('крупный текст: порог 3 к 1', () => {
    expect(meetsAA('#777777', '#ffffff', true), '#777777 на белом, крупный текст').toBe(true);
  });

  it('24px считается крупным текстом', () => {
    expect(isLargeText(24, false), '24px обычным начертанием').toBe(true);
    expect(isLargeText(16, false), '16px обычным начертанием').toBe(false);
  });
});
