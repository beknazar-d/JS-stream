describe('Баннер целиком и соседний блок', () => {
  it('заголовок и абзац внутри баннера', () => {
    const banner = box('.banner');
    for (const sel of ['.banner-title', '.banner-text']) {
      expect(box(sel).top >= banner.top && box(sel).bottom <= banner.bottom, `Элемент ${sel} лежит внутри баннера`).toBe(true);
    }
  });

  it('следующий блок сразу под баннером', () => {
    expect(Math.abs(box('.after').top - box('.banner').bottom) <= 1, `Зазор между баннером и следующим блоком: ${box('.after').top - box('.banner').bottom}`).toBe(true);
  });

  it('значения отступов не менялись', () => {
    expect(css('.banner-title', 'margin-top'), 'margin-top заголовка').toBe('24px');
    expect(css('.banner-text', 'margin-bottom'), 'margin-bottom абзаца').toBe('24px');
  });

  it('баннер не сдвинут вниз', () => {
    expect(box('.banner').top, 'Верхний край баннера').toBe(0);
  });
});
