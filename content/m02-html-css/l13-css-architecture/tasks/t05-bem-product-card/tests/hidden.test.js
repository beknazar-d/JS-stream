const source = () => $('style[data-file="styles.css"]').textContent.replace(/\/\*[\s\S]*?\*\//g, '');
const selectors = () =>
  [...$('style[data-file="styles.css"]').sheet.cssRules]
    .filter((r) => r.selectorText)
    .flatMap((r) => r.selectorText.split(',').map((s) => s.trim()));
const BEM = /^\.[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?(:[a-z-]+)?$/;

describe('разметка по БЭМ', () => {
  it('каждая карточка — блок product-card', () => {
    for (const [i, card] of $$('[data-card]').entries()) {
      expect(card.classList.contains('product-card'), `Карточка №${i + 1}: нужен класс product-card`).toBe(true);
    }
  });

  it('элементы названы блок__элемент', () => {
    for (const [i, card] of $$('[data-card]').entries()) {
      for (const [attr, cls] of [['data-image', 'product-card__image'], ['data-title', 'product-card__title'], ['data-price', 'product-card__price'], ['data-button', 'product-card__button']]) {
        expect(card.querySelector(`[${attr}]`).classList.contains(cls), `Карточка №${i + 1}: у элемента с ${attr} должен быть класс ${cls}`).toBe(true);
      }
    }
  });

  it('скидка выражена модификатором, а базовый класс остаётся', () => {
    const sale = $$('.product-card--sale');
    expect(sale, 'Карточек с модификатором product-card--sale').toHaveLength(1);
    expect(sale[0].classList.contains('product-card'), 'Рядом с модификатором должен остаться класс product-card').toBe(true);
    expect(sale[0] === $$('[data-card]')[1], 'Модификатор у второй карточки').toBe(true);
  });

  it('старая цена — модификатор элемента', () => {
    const old = $('[data-old-price]');
    expect(old.classList.contains('product-card__price') && old.classList.contains('product-card__price--old'), 'Старая цена: product-card__price и product-card__price--old').toBe(true);
  });

  it('в разметке нет inline-стилей и данных для тестов не потеряно', () => {
    expect($$('[style]').length, 'Атрибутов style').toBe(0);
    expect($$('[data-card]').length, 'Атрибутов data-card').toBe(3);
  });
});

describe('стили по БЭМ', () => {
  it('нет идентификаторов и !important', () => {
    expect(/!\s*important/.test(source()), 'Нужно убрать !important').toBe(false);
    expect(selectors().filter((s) => s.includes('#')), 'Селекторы с #id').toEqual([]);
  });

  it('каждый селектор — один БЭМ-класс', () => {
    const bad = selectors().filter((s) => s !== 'body' && s !== '*' && s !== 'html' && !BEM.test(s));
    expect(bad, 'Селекторы не по БЭМ: нужен один класс вида блок__элемент--модификатор').toEqual([]);
  });

  it('прежние имена классов не используются', () => {
    for (const old of ['.card', '.pic', '.t', '.p', '.b', '.hot', '.old', '.grid', '.h']) {
      expect(selectors().some((s) => s.split(/[\s>+~:]+/).includes(old)), `Остался старый селектор ${old}`).toBe(false);
    }
  });
});
