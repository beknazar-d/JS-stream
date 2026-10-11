describe('Рамка и заголовок', () => {
  it('рамка 1px solid #dde3ea', () => {
    for (const side of ['top', 'right', 'bottom', 'left']) {
      expect(css('.page', `border-${side}-width`), `Толщина рамки (${side})`).toBe('1px');
      expect(css('.page', `border-${side}-style`), `Стиль рамки (${side})`).toBe('solid');
      expect(css('.page', `border-${side}-color`), `Цвет рамки (${side})`).toBe('rgb(221, 227, 234)');
    }
  });

  it('отступы заголовка', () => {
    expect(css('.page h1', 'margin-top'), 'margin-top заголовка').toBe('0px');
    expect(css('.page h1', 'margin-left'), 'margin-left заголовка').toBe('0px');
    expect(css('.page h1', 'margin-right'), 'margin-right заголовка').toBe('0px');
    expect(css('.page h1', 'margin-bottom'), 'margin-bottom заголовка').toBe('16px');
  });

  it('заголовок прилегает к внутренней границе колонки', () => {
    expect(box('.page h1').top - box('.page').top, 'Расстояние от верха колонки до заголовка: рамка 1 + отступ 24').toBe(25);
    expect(box('.page h1').left - box('.page').left, 'Расстояние слева: рамка 1 + отступ 32').toBe(33);
  });

  it('колонка остаётся по центру при другой ширине окна', async () => {
    await viewport(1200);
    expect(box('.page').left, 'Левый край при ширине окна 1200').toBe(200);
    await viewport(1024);
  });
});
