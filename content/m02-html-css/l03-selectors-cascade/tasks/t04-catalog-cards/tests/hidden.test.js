const cards = () => $$('.card');

describe('Состояния карточек', () => {
  it('прозрачность только у карточки без остатка', () => {
    expect(cards().map((c) => css(c, 'opacity')), 'opacity карточек').toEqual(['1', '0.5', '1']);
  });

  it('кнопки: выключенная серая, доступная синяя', () => {
    const [first, second, third] = $$('.buy');
    expect(css(second, 'background-color'), 'Фон выключенной кнопки').toBe('rgb(203, 210, 217)');
    expect(css(second, 'color'), 'Текст выключенной кнопки').toBe('rgb(90, 101, 114)');
    for (const button of [first, third]) {
      expect(css(button, 'background-color'), 'Фон доступной кнопки').toBe('rgb(31, 111, 235)');
      expect(css(button, 'color'), 'Текст доступной кнопки').toBe('rgb(255, 255, 255)');
    }
  });

  it('заглавными только первый бейдж', () => {
    const [first, second] = $$('.badge');
    expect(css(first, 'text-transform'), 'text-transform у бейджа в начале карточки').toBe('uppercase');
    expect(css(second, 'text-transform'), 'text-transform у бейджа не на первом месте').toBe('none');
  });

  it('рамка у каждой третьей карточки', () => {
    expect(cards().map((c) => css(c, 'border-top-color')), 'Цвет рамки карточек').toEqual(['rgb(221, 227, 234)', 'rgb(221, 227, 234)', 'rgb(31, 111, 235)']);
    expect(css(cards()[2], 'border-top-width'), 'Толщина рамки третьей карточки').toBe('1px');
  });

  it('без !important и id в селекторах', () => {
    const text = $('style[data-file="styles.css"]').textContent;
    expect(text.includes('!important'), 'В styles.css есть !important').toBe(false);
    const selectors = [...document.styleSheets].flatMap((s) => [...s.cssRules]).map((r) => r.selectorText || '');
    expect(selectors.some((s) => s.includes('#')), 'Среди селекторов есть селектор по id').toBe(false);
  });

  it('базовые правила на месте', () => {
    expect(css('.card', 'padding-left'), 'Внутренний отступ карточки (базовое правило)').toBe('12px');
    expect(css('.card', 'list-style-type'), 'list-style у карточки (базовое правило)').toBe('none');
  });
});
