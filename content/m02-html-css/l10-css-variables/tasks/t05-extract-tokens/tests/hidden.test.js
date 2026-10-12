const root = document.documentElement;

describe('Одно место для изменений', () => {
  it('смена --color-brand на :root перекрашивает и шапку, и кнопку', () => {
    root.style.setProperty('--color-brand', 'rgb(0, 0, 255)');
    const header = css('.site-header', 'background-color');
    const button = css('.button', 'background-color');
    root.style.removeProperty('--color-brand');
    expect(header, 'Фон шапки при новом --color-brand').toBe('rgb(0, 0, 255)');
    expect(button, 'Фон кнопки при новом --color-brand').toBe('rgb(0, 0, 255)');
  });

  it('смена --color-border перекрашивает рамку карточки и линию подвала', () => {
    root.style.setProperty('--color-border', 'rgb(255, 0, 0)');
    const product = css('.product', 'border-top-color');
    const footer = css('.site-footer', 'border-top-color');
    root.style.removeProperty('--color-border');
    expect(product, 'Рамка карточки при новом --color-border').toBe('rgb(255, 0, 0)');
    expect(footer, 'Линия подвала при новом --color-border').toBe('rgb(255, 0, 0)');
  });

  it('смена --space-md меняет отступы шапки, карточки, кнопки и подвала', () => {
    root.style.setProperty('--space-md', '32px');
    const values = ['.site-header', '.product', '.button', '.site-footer'].map((selector) => css(selector, 'padding-left'));
    root.style.removeProperty('--space-md');
    expect(values, 'Боковые отступы четырёх блоков при --space-md: 32px').toEqual(['32px', '32px', '32px', '32px']);
  });

  it('смена --color-text и --color-surface меняет страницу целиком', () => {
    root.style.setProperty('--color-text', 'rgb(1, 2, 3)');
    root.style.setProperty('--color-surface', 'rgb(4, 5, 6)');
    const text = css('.site-footer', 'color');
    const body = css('body', 'background-color');
    const card = css('.product', 'background-color');
    root.style.removeProperty('--color-text');
    root.style.removeProperty('--color-surface');
    expect(text, 'Цвет текста подвала').toBe('rgb(1, 2, 3)');
    expect(body, 'Фон страницы').toBe('rgb(4, 5, 6)');
    expect(card, 'Фон карточки').toBe('rgb(4, 5, 6)');
  });
});
