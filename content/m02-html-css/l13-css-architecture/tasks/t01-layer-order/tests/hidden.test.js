const sheet = () => $('style[data-file="styles.css"]').sheet;
const source = () => $('style[data-file="styles.css"]').textContent.replace(/\/\*[\s\S]*?\*\//g, '');

describe('порядок и состав слоёв', () => {
  it('нет !important', () => {
    expect(/!\s*important/.test(source()), 'В styles.css не должно быть !important').toBe(false);
  });

  it('все правила лежат внутри слоёв', () => {
    const loose = [...sheet().cssRules].filter((r) => !/^CSSLayer(Block|Statement)Rule$/.test(r.constructor.name));
    expect(loose.map((r) => r.cssText.slice(0, 40)), 'Правила вне слоёв побеждают любой слой').toEqual([]);
  });

  it('порядок слоёв: сброс, компоненты, утилиты', () => {
    const statement = [...sheet().cssRules].find((r) => r.constructor.name === 'CSSLayerStatementRule');
    expect(statement, 'Нужно объявление порядка слоёв: @layer a, b, c;').toBeDefined();
    expect(statement.nameList.length, 'В объявлении три слоя').toBe(3);
  });

  it('утилиты побеждают компоненты на любых селекторах', () => {
    const probe = document.createElement('div');
    probe.className = 'card u-hidden';
    document.body.append(probe);
    expect(getComputedStyle(probe).display, 'u-hidden на элементе card').toBe('none');
    probe.remove();
  });

  it('утилита с отступом работает на кнопке, а не только на заголовке', () => {
    const b = document.createElement('button');
    b.className = 'btn btn--primary u-mt-16';
    document.body.append(b);
    expect(getComputedStyle(b).marginTop, 'Отступ утилиты у кнопки').toBe('16px');
    b.remove();
  });

  it('значения свойств не изменились', () => {
    expect(css('.btn:not(.u-hidden)', 'background-color'), 'Цвет кнопки').toBe('rgb(11, 61, 145)');
    expect(css('.card', 'padding-left'), 'Отступ карточки').toBe('16px');
    expect(css('.card__title', 'font-size'), 'Размер заголовка').toBe('18px');
  });
});
