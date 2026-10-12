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

for (const theme of ['light', 'dark', 'sale']) {
  describe(`Тема ${theme}`, () => {
    it('текст на странице, карточке и кнопке читается', () => {
      root.setAttribute('data-theme', theme);
      readable('body', `Страница в теме ${theme}`);
      readable('.card', `Карточка в теме ${theme}`);
      readable('.button', `Кнопка в теме ${theme}`);
    });

    it('обычная плашка берёт фон из --color-accent', () => {
      root.setAttribute('data-theme', theme);
      expect(css('.badge:not(.badge--hot)', 'background-color'), `Фон плашки «Новинка» в теме ${theme}`).toBe(tokenColor('--color-accent'));
      readable('.badge:not(.badge--hot)', `Плашка «Новинка» в теме ${theme}`);
    });
  });
}

describe('Своеобразие тем', () => {
  it('в тёмной теме фон страницы тёмный', () => {
    root.setAttribute('data-theme', 'dark');
    expect(luminance(css('body', 'background-color')), 'Фон страницы в теме dark').toBeLessThan(0.1);
  });

  it('в теме sale шапка и кнопка красноватые, фон тёмный', () => {
    root.setAttribute('data-theme', 'sale');
    const [r, g, b] = parse(css('.site-header', 'background-color'));
    expect(r > g + 80 && r > b + 80, `Шапка в теме sale должна быть красной, сейчас rgb(${r}, ${g}, ${b})`).toBe(true);
    expect(luminance(css('body', 'background-color')), 'Фон страницы в теме sale').toBeLessThan(0.1);
  });

  it('без data-theme страница светлая', () => {
    expect(luminance(css('body', 'background-color')), 'Фон страницы по умолчанию').toBeGreaterThan(0.8);
  });
});
