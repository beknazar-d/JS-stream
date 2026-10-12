const sheet = () => $('style[data-file="styles.css"]').sheet;
const source = () => $('style[data-file="styles.css"]').textContent.replace(/\/\*[\s\S]*?\*\//g, '');
const BEM = /^\.[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?(:[a-z-]+)?$/;

function allRules(rules, into = []) {
  for (const rule of rules) {
    if (rule.selectorText) into.push(rule);
    if (rule.cssRules) allRules(rule.cssRules, into);
  }
  return into;
}
const layerBlock = (name) => [...sheet().cssRules].find((r) => r.constructor.name === 'CSSLayerBlockRule' && r.name === name);

describe('слои', () => {
  it('порядок слоёв объявлен', () => {
    const statement = [...sheet().cssRules].find((r) => r.constructor.name === 'CSSLayerStatementRule');
    expect(statement, 'Нужно объявление порядка слоёв в начале файла').toBeDefined();
    expect([...statement.nameList], 'Порядок слоёв').toEqual(['reset', 'base', 'components', 'utilities']);
  });

  it('все правила лежат внутри слоёв', () => {
    const loose = [...sheet().cssRules].filter((r) => !/^CSSLayer(Block|Statement)Rule$/.test(r.constructor.name));
    expect(loose.map((r) => r.cssText.slice(0, 50)), 'Правила вне слоёв (включая @media) побеждают любой слой').toEqual([]);
  });

  it('в каждом слое есть правила', () => {
    for (const name of ['reset', 'base', 'components', 'utilities']) {
      const block = layerBlock(name);
      expect(block, `Нет блока @layer ${name}`).toBeDefined();
      expect(allRules(block.cssRules).length > 0, `Слой ${name} пуст`).toBe(true);
    }
  });

  it('утилиты лежат в слое utilities', () => {
    const selectors = allRules(layerBlock('utilities').cssRules).map((r) => r.selectorText);
    for (const name of ['.u-mt-24', '.u-mt-32', '.u-hidden']) {
      expect(selectors.includes(name), `Правило ${name} должно быть в слое utilities`).toBe(true);
    }
  });

  it('u-hidden скрывает любой компонент', () => {
    const card = $('[data-card]');
    card.classList.add('u-hidden');
    expect(css(card, 'display'), 'display карточки с u-hidden').toBe('none');
    card.classList.remove('u-hidden');
    const header = $('[data-header]');
    header.classList.add('u-hidden');
    expect(css(header, 'display'), 'display шапки с u-hidden').toBe('none');
    header.classList.remove('u-hidden');
  });
});

describe('БЭМ и чистота', () => {
  it('нет !important, id и атрибутов style', () => {
    expect(/!\s*important/.test(source()), 'Нужно убрать !important').toBe(false);
    expect($$('[style]').length, 'Атрибутов style в разметке').toBe(0);
    const ids = allRules(sheet().cssRules).filter((r) => r.selectorText.includes('#')).map((r) => r.selectorText);
    expect(ids, 'Селекторы с #id').toEqual([]);
  });

  it('каждый селектор — один БЭМ-класс', () => {
    const bad = allRules(sheet().cssRules)
      .flatMap((r) => r.selectorText.split(',').map((s) => s.trim()))
      .filter((s) => s !== '*' && s !== 'body' && !BEM.test(s));
    expect(bad, 'Селекторы не по БЭМ').toEqual([]);
  });

  it('классы в разметке названы по БЭМ', () => {
    const need = [
      ['[data-header]', 'site-header'],
      ['[data-logo]', 'site-header__logo'],
      ['[data-nav]', 'site-header__nav'],
      ['[data-page]', 'catalog'],
      ['[data-page-title]', 'catalog__title'],
      ['[data-grid]', 'catalog__list'],
      ['[data-note]', 'catalog__note'],
      ['[data-footer]', 'site-footer'],
    ];
    for (const [sel, cls] of need) {
      expect($(sel).classList.contains(cls), `У элемента ${sel} должен быть класс ${cls}`).toBe(true);
    }
    for (const link of $$('[data-nav-link]')) expect(link.classList.contains('site-header__link'), 'Ссылка меню: site-header__link').toBe(true);
    expect($$('.site-header__link--active'), 'Активных ссылок').toHaveLength(1);
    expect($('.site-header__link--active') === $$('[data-nav-link]')[0], 'Активна первая ссылка').toBe(true);
  });

  it('карточки по БЭМ с модификатором скидки рядом с блоком', () => {
    const cards = $$('[data-card]');
    expect(cards, 'Карточек').toHaveLength(4);
    for (const c of cards) {
      expect(c.classList.contains('product-card'), 'Каждая карточка имеет класс product-card').toBe(true);
      for (const [attr, cls] of [['data-image', 'product-card__image'], ['data-title', 'product-card__title'], ['data-price', 'product-card__price'], ['data-button', 'product-card__button']]) {
        expect(c.querySelector(`[${attr}]`).classList.contains(cls), `В карточке у ${attr} должен быть класс ${cls}`).toBe(true);
      }
    }
    expect($$('.product-card--sale'), 'Карточек со скидкой').toHaveLength(1);
    expect($('.product-card--sale') === cards[1], 'Скидка у второй карточки').toBe(true);
    const old = $('[data-old-price]');
    expect(old.classList.contains('product-card__price') && old.classList.contains('product-card__price--old'), 'Старая цена: два класса').toBe(true);
  });

  it('утилиты стоят там, где были inline-стиль и .mt', () => {
    expect($('[data-note]').classList.contains('u-mt-24'), 'У примечания u-mt-24').toBe(true);
    expect($('[data-footer]').classList.contains('u-mt-32'), 'У подвала u-mt-32').toBe(true);
  });

  it('старых классов нет', () => {
    const old = ['card', 'hot', 'grid', 'mt', 'logo', 'nav', 'note', 'pic', 'old', 'active', 'h', 't', 'p', 'b'];
    const used = old.filter((c) => document.querySelector('.' + c));
    expect(used, 'Старые классы остались в разметке').toEqual([]);
  });
});
