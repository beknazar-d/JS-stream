describe('Запасное значение', () => {
  it('без --badge-color плашка красная (#b42318)', () => {
    expect(css('.badge', 'color'), 'Цвет плашки, когда --badge-color не задана, берётся из запасного значения').toBe('rgb(180, 35, 24)');
  });

  it('если --badge-color задана, она побеждает запасное значение', () => {
    const badge = $('.badge');
    badge.style.setProperty('--badge-color', 'rgb(0, 0, 255)');
    const value = css(badge, 'color');
    badge.style.removeProperty('--badge-color');
    expect(value, 'Цвет плашки при заданной --badge-color').toBe('rgb(0, 0, 255)');
  });

  it('смена --space-md на :root меняет отступы кнопки и страницы', () => {
    const root = document.documentElement;
    root.style.setProperty('--space-md', '24px');
    const button = css('.button', 'padding-left');
    const order = css('.order', 'padding-left');
    root.style.removeProperty('--space-md');
    expect(button, 'Отступ кнопки при --space-md: 24px').toBe('24px');
    expect(order, 'Отступ страницы при --space-md: 24px').toBe('24px');
  });
});
