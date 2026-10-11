const chPx = (el) => {
  const probe = document.createElement('span');
  probe.style.cssText = 'display:inline-block;width:1ch;padding:0;margin:0;border:0';
  el.appendChild(probe);
  const px = probe.getBoundingClientRect().width;
  probe.remove();
  return px;
};
const charsPerLine = (sel) => {
  const el = $(sel);
  return box(sel).width / chPx(el);
};
const withRoot = (px, fn) => {
  document.documentElement.style.fontSize = px + 'px';
  try { return fn(); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Карточка товара: текст', () => {
  it('размеры шрифта в rem', () => {
    expect(css('h1', 'font-size'), 'Заголовок: 2rem').toBe('32px');
    expect(css('.price', 'font-size'), 'Цена: 1.5rem').toBe('24px');
    expect(css('.lead', 'font-size'), 'Вводный абзац: 1.25rem').toBe('20px');
    expect(css('.text', 'font-size'), 'Основной текст: 1rem').toBe('16px');
  });

  it('межстрочье основного текста от 1.5 до 1.8', () => {
    const ratio = parseFloat(css('.text', 'line-height')) / parseFloat(css('.text', 'font-size'));
    expect(ratio, 'Отношение line-height к font-size основного текста').toBeGreaterThanOrEqual(1.5);
    expect(ratio, 'Отношение line-height к font-size основного текста').toBeLessThanOrEqual(1.8);
  });

  it('строка основного текста — от 60 до 75 символов', () => {
    const chars = charsPerLine('.text');
    expect(chars, 'Символов в строке основного текста, ' + chars.toFixed(0)).toBeGreaterThanOrEqual(60);
    expect(chars, 'Символов в строке основного текста, ' + chars.toFixed(0)).toBeLessThanOrEqual(75);
  });

  it('статья стоит по центру окна', () => {
    const b = box('.product');
    expect(Math.abs(b.left - (1024 - b.right)), 'Левое и правое поле статьи равны').toBeLessThanOrEqual(2);
    expect(b.width, 'Статья уже окна: она ограничена по ширине').toBeLessThan(1000);
  });
});
