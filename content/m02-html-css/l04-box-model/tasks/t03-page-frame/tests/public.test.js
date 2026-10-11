describe('Колонка по центру', () => {
  it('ширина колонки 800px вместе с рамкой и отступами', () => {
    expect(box('.page').width, 'Ширина .page').toBe(800);
  });

  it('колонка по центру окна', () => {
    expect(box('.page').left, 'Левый край .page (при ширине окна 1024)').toBe(112);
    expect(box('.page').right, 'Правый край .page').toBe(912);
  });

  it('внутренние отступы', () => {
    expect(css('.page', 'padding-top'), 'padding-top').toBe('24px');
    expect(css('.page', 'padding-bottom'), 'padding-bottom').toBe('24px');
    expect(css('.page', 'padding-left'), 'padding-left').toBe('32px');
    expect(css('.page', 'padding-right'), 'padding-right').toBe('32px');
  });
});
