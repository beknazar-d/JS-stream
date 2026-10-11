function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const rgbOf = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const bgOf = (selector) => rgbOf(css(selector, 'background-color'));
const fgOf = (selector) => rgbOf(css(selector, 'color'));
const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]';

describe('порядок Tab и ссылка пропуска', () => {
  it('ссылка пропуска первая и ведёт на main', () => {
    const first = $(FOCUSABLE);
    expect(first.classList.contains('skip-link'), 'Первым в порядке Tab должен стоять .skip-link').toBe(true);
    expect(first.getAttribute('href'), 'Ссылка пропуска ведёт на #main').toBe('#main');
    expect($('main#main'), 'У элемента main должен быть id="main"').not.toBeNull();
    expect(first.textContent.trim(), 'Текст ссылки пропуска').toBe('Перейти к содержимому');
  });

  it('порядок Tab совпадает с визуальным', () => {
    const expected = ['skip-link', 'header__logo', 'icon-button--fav', 'icon-button--cart', 'search__input', 'search__button'];
    const actual = $$(FOCUSABLE).map((el) => expected.find((c) => el.classList.contains(c)) ?? el.className);
    expect(actual, 'Порядок интерактивных элементов в разметке').toEqual(expected);
    expect($$('[tabindex]').filter((el) => Number(el.getAttribute('tabindex')) > 0).length, 'Положительных tabindex быть не должно').toBe(0);
  });

  it('без фокуса ссылку не видно, с фокусом она в левом верхнем углу', () => {
    const link = $('.skip-link');
    link.blur();
    const hidden = box(link);
    expect(hidden.bottom <= 0 || hidden.width <= 2 || hidden.right <= 0, `Без фокуса ссылка видна: top=${hidden.top}, width=${hidden.width}`).toBe(true);
    link.focus();
    const shown = box(link);
    expect(shown.top >= 0 && shown.left >= 0 && shown.width >= 100 && shown.height >= 24, `При фокусе ссылка должна быть видна: ${JSON.stringify(shown)}`).toBe(true);
    expect(shown.left < 200 && shown.top < 100, 'Ссылка появляется в левом верхнем углу').toBe(true);
    const r = ratio(fgOf('.skip-link'), bgOf('.skip-link'));
    expect(r >= 4.5, `Контраст ссылки пропуска ${r.toFixed(2)} к 1, нужно не меньше 4,5`).toBe(true);
    link.blur();
  });
});

describe('имена', () => {
  it('кнопки-значки имеют имена', () => {
    expect(labelOf('.icon-button--fav'), 'Имя «Избранное»').toMatch(/Избранное/);
    const cart = labelOf('.icon-button--cart');
    expect(/Корзина/.test(cart) && /3/.test(cart), `Имя корзины «${cart}» должно содержать слово «Корзина» и число 3`).toBe(true);
  });

  it('значки svg скрыты от скринридера', () => {
    for (const svg of $$('.icon-button svg')) {
      expect(svg.getAttribute('aria-hidden'), 'У svg aria-hidden="true"').toBe('true');
    }
  });

  it('поле поиска подписано', () => {
    expect(labelOf('.search__input'), 'Имя поля поиска').toBe('Поиск по магазину');
  });
});

describe('контраст', () => {
  const header = () => bgOf('.header');
  it('логотип', () => {
    const r = ratio(fgOf('.header__logo'), header());
    expect(r >= 4.5, `Логотип: ${r.toFixed(2)} к 1`).toBe(true);
  });
  it('цифра в бейдже', () => {
    const r = ratio(fgOf('.badge'), bgOf('.badge'));
    expect(r >= 4.5, `Бейдж: ${r.toFixed(2)} к 1, нужно не меньше 4,5`).toBe(true);
  });
  it('кнопка «Найти»', () => {
    const r = ratio(fgOf('.search__button'), bgOf('.search__button'));
    expect(r >= 4.5, `Кнопка «Найти»: ${r.toFixed(2)} к 1`).toBe(true);
  });
  it('текст в поле', () => {
    const r = ratio(fgOf('.search__input'), bgOf('.search__input'));
    expect(r >= 4.5, `Поле поиска: ${r.toFixed(2)} к 1`).toBe(true);
  });
  it('значки кнопок', () => {
    for (const sel of ['.icon-button--fav', '.icon-button--cart']) {
      const r = ratio(fgOf(sel), header());
      expect(r >= 3, `Значок ${sel}: ${r.toFixed(2)} к 1, нужно не меньше 3`).toBe(true);
    }
  });
});

describe('видимый фокус на тёмной шапке', () => {
  for (const sel of ['.header__logo', '.icon-button--fav', '.icon-button--cart', '.search__input', '.search__button']) {
    it(`рамка у ${sel}`, () => {
      const el = $(sel);
      el.focus();
      const style = getComputedStyle(el);
      expect(el.matches(':focus-visible'), 'Фокус должен считаться видимым').toBe(true);
      expect(style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2, `${sel}: нужна рамка outline от 2px`).toBe(true);
      const r = ratio(rgbOf(style.outlineColor), bgOf('.header'));
      expect(r >= 3, `${sel}: контраст рамки с фоном шапки ${r.toFixed(2)} к 1, нужно не меньше 3`).toBe(true);
      el.blur();
    });
  }
});
