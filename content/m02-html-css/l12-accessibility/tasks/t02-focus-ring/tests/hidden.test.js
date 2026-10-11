function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance([r, g, b]) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function rgbOf(color) {
  return color.match(/[\d.]+/g).slice(0, 3).map(Number);
}
function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const css_text = () => [...document.querySelectorAll('style[data-file="styles.css"]')].map((s) => s.textContent).join('\n');

describe('цвет и способ записи фокуса', () => {
  for (const selector of ['.nav a', '.search__input', '.search__button', '.sort', '.product__buy']) {
    it(`рамка у «${selector}» достаточно контрастна`, () => {
      const el = $(selector);
      el.focus();
      const style = getComputedStyle(el);
      if (style.outlineStyle !== 'none') {
        const r = ratio(rgbOf(style.outlineColor), [255, 255, 255]);
        expect(r >= 3, `Контраст рамки ${selector} с белым фоном ${r.toFixed(2)} к 1, нужно не меньше 3 к 1`).toBe(true);
      }
      el.blur();
    });
  }

  it('стили фокуса записаны через :focus-visible', () => {
    expect(/:focus-visible/.test(css_text()), 'В styles.css нет селектора :focus-visible').toBe(true);
  });

  it('нигде не отключён outline', () => {
    const text = css_text().replace(/\/\*[\s\S]*?\*\//g, '');
    expect(/outline\s*:\s*(none|0)\s*[;}]/.test(text), 'В styles.css остался outline: none или outline: 0').toBe(false);
  });

  it('внешний вид без фокуса не изменился', () => {
    expect(css('.search__button', 'background-color'), 'Фон кнопки «Найти»').toBe('rgb(11, 61, 145)');
    expect(css('.nav a', 'text-decoration-line'), 'Ссылки меню без подчёркивания').toBe('none');
    const el = $('.product__buy');
    el.blur();
    expect(getComputedStyle(el).outlineStyle, 'Без фокуса рамки быть не должно').toBe('none');
  });
});
