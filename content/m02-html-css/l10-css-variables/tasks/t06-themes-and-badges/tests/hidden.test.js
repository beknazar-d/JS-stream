const parse = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
const channel = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const luminance = (color) => { const [r, g, b] = parse(color).map(channel); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const root = document.documentElement;
// Цвет, в который сейчас превращается переменная: подставляем её в пробный элемент.
function tokenColor(name) {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  document.body.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}
const readable = (selector, label) =>
  expect(contrast(css(selector, "color"), css(selector, "background-color")), `${label}: контраст текста к фону не ниже 4.5`).toBeGreaterThanOrEqual(4.5);
afterEach(() => root.removeAttribute("data-theme"));

describe('Плашка «Хит продаж» не зависит от темы', () => {
  for (const theme of ['light', 'dark', 'sale']) {
    it(`в теме ${theme} фон красный #b42318 и текст читается`, () => {
      root.setAttribute('data-theme', theme);
      expect(css('.badge--hot', 'background-color'), `Фон плашки «Хит продаж» в теме ${theme}`).toBe('rgb(180, 35, 24)');
      expect(css('.badge--hot', 'color'), `Цвет текста плашки «Хит продаж» в теме ${theme}`).toBe('rgb(255, 255, 255)');
    });
  }
});

describe('Плашка принимает свои значения', () => {
  it('--badge-bg и --badge-color, заданные на плашке, побеждают тему', () => {
    const badge = $('.badge:not(.badge--hot)');
    badge.style.setProperty('--badge-bg', 'rgb(1, 2, 3)');
    badge.style.setProperty('--badge-color', 'rgb(250, 250, 250)');
    const background = css(badge, 'background-color');
    const color = css(badge, 'color');
    badge.style.removeProperty('--badge-bg');
    badge.style.removeProperty('--badge-color');
    expect(background, 'Фон плашки при заданной --badge-bg').toBe('rgb(1, 2, 3)');
    expect(color, 'Цвет текста плашки при заданной --badge-color').toBe('rgb(250, 250, 250)');
  });
});

describe('Тема живёт в переменных', () => {
  it('в :root объявлены все семь переменных', () => {
    for (const name of ['--color-bg', '--color-surface', '--color-text', '--color-brand', '--color-on-brand', '--color-accent', '--color-on-accent']) {
      expect(css(':root', name), `Переменная ${name} в :root`).not.toBe('');
    }
  });

  it('вне :root, тем и .badge--hot нет цветов-литералов', () => {
    const literal = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i;
    const offenders = [];
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (!(rule instanceof CSSStyleRule)) continue;
        const selector = rule.selectorText;
        if (selector === ':root' || selector.startsWith('[data-theme') || selector === '.badge--hot') continue;
        if (literal.test(rule.style.cssText)) offenders.push(selector);
      }
    }
    expect(offenders, 'Эти правила используют цвет-значение вместо переменной. Тема не сможет их перекрасить').toEqual([]);
  });

  it('светлая тема, выбранная явно, совпадает с обычной', () => {
    const before = css('body', 'background-color');
    root.setAttribute('data-theme', 'light');
    expect(css('body', 'background-color'), 'Явный data-theme="light" ничего не меняет').toBe(before);
  });
});
