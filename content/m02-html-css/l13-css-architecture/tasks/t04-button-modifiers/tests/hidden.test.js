const btn = (text) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === text);
const source = () => $('style[data-file="styles.css"]').textContent.replace(/\/\*[\s\S]*?\*\//g, '');
const selectors = () =>
  [...$('style[data-file="styles.css"]').sheet.cssRules]
    .filter((r) => r.selectorText)
    .flatMap((r) => r.selectorText.split(',').map((s) => s.trim()));

describe('базовая кнопка не изменилась', () => {
  it('серая кнопка «В корзину»', () => {
    const b = btn('В корзину');
    expect(css(b, 'background-color'), 'Фон «В корзину»').toBe('rgb(229, 231, 235)');
    expect(css(b, 'padding-top'), 'Вертикальный отступ «В корзину»').toBe('12px');
    expect(css(b, 'padding-left'), 'Горизонтальный отступ «В корзину»').toBe('24px');
    expect(css(b, 'font-size'), 'Размер шрифта «В корзину»').toBe('16px');
  });

  it('у модификаторов остались общие свойства базы', () => {
    expect(css(btn('Купить сейчас'), 'padding-left'), 'Отступы «Купить сейчас» от базового класса').toBe('24px');
    expect(css(btn('В избранное'), 'border-top-width'), 'Рамка «В избранное»').toBe('2px');
  });
});

describe('способ записи', () => {
  it('нет !important', () => {
    expect(/!\s*important/.test(source()), 'В styles.css не должно быть !important').toBe(false);
  });

  it('нет селекторов с идентификатором', () => {
    const withId = selectors().filter((s) => s.includes('#'));
    expect(withId, 'Селекторы с #id повышают специфичность').toEqual([]);
  });

  it('модификаторы не повышают специфичность', () => {
    const heavy = selectors().filter((s) => /--/.test(s) && s.split(/[\s>+~]+/).length > 1);
    expect(heavy, 'Селекторы модификаторов должны состоять из одного класса').toEqual([]);
  });

  it('разметка не изменилась', () => {
    expect($$('button'), 'Количество кнопок').toHaveLength(4);
    expect($('#catalog'), 'Контейнер #catalog остаётся в разметке').not.toBeNull();
  });
});
