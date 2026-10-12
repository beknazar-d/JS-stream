const L1 = '.menu > li';
const L2 = '.menu > li > ul > li';
const L3 = '.menu > li > ul > li > ul > li';

describe('Размер пунктов меню', () => {
  it('пункты всех уровней вложенности имеют размер 14px', () => {
    expect(css(L1, 'font-size'), 'Первый уровень меню').toBe('14px');
    expect(css(L2, 'font-size'), 'Второй уровень меню («Холодильники»)').toBe('14px');
    expect(css(L3, 'font-size'), 'Третий уровень меню («Двухкамерные»)').toBe('14px');
  });
});
