const parse = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
const channel = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const luminance = (color) => { const [r, g, b] = parse(color).map(channel); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const root = document.documentElement;
afterEach(() => root.removeAttribute("data-theme"));

// Браузер тестов нельзя переключить на тёмную системную тему. Тест достаёт правила
// из блока @media (prefers-color-scheme: dark) и применяет их так, как будто условие выполнено.
function systemDarkRules() {
  const rules = [];
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSMediaRule && /prefers-color-scheme\s*:\s*dark/.test(rule.media.mediaText)) {
        for (const inner of rule.cssRules) rules.push(inner.cssText);
      }
    }
  }
  return rules.join('\n');
}

function withSystemDark(callback) {
  const style = document.createElement('style');
  style.textContent = systemDarkRules();
  document.head.append(style);
  try {
    return callback();
  } finally {
    style.remove();
  }
}

describe('Тема системы', () => {
  it('есть блок prefers-color-scheme: dark с правилами', () => {
    expect(systemDarkRules().length, 'Нужен @media (prefers-color-scheme: dark) с переменными тёмной темы').toBeGreaterThan(0);
  });

  it('если человек тему не выбирал, тёмная системная тема включает тёмные цвета', () => {
    const value = withSystemDark(() => luminance(css('body', 'background-color')));
    expect(value, 'Фон страницы при тёмной теме системы и без data-theme').toBeLessThan(0.1);
  });

  it('если человек выбрал светлую тему, тема системы её не перебивает', () => {
    root.setAttribute('data-theme', 'light');
    const value = withSystemDark(() => luminance(css('body', 'background-color')));
    expect(value, 'При data-theme="light" фон остаётся светлым, даже если система тёмная').toBeGreaterThan(0.8);
  });

  it('если человек выбрал тёмную тему, она остаётся тёмной', () => {
    root.setAttribute('data-theme', 'dark');
    const value = withSystemDark(() => luminance(css('body', 'background-color')));
    expect(value, 'При data-theme="dark" фон тёмный').toBeLessThan(0.1);
  });
});
