const chPx = (el) => {
  const probe = document.createElement('span');
  probe.style.cssText = 'display:inline-block;width:1ch;padding:0;margin:0;border:0';
  el.appendChild(probe);
  const px = probe.getBoundingClientRect().width;
  probe.remove();
  return px;
};
const charsPerLine = (sel) => box(sel).width / chPx($(sel));
const withRoot = (px, fn) => {
  document.documentElement.style.fontSize = px + 'px';
  try { return fn(); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Страница статьи', () => {
  it('шрифт: стек с общим семейством', () => {
    const family = css('body', 'font-family');
    expect(family.split(',').length, 'В стеке не меньше трёх шрифтов').toBeGreaterThanOrEqual(3);
    expect(family.trim(), 'Стек заканчивается общим семейством').toMatch(/(sans-serif|serif)$/);
  });

  it('размеры заголовков в rem', () => {
    expect(css('h1', 'font-size'), 'h1: 2.5rem').toBe('40px');
    expect(css('h2', 'font-size'), 'h2: 1.75rem').toBe('28px');
    expect(css('.article p:not(.intro)', 'font-size'), 'Основной текст: 1rem').toBe('16px');
    expect(css('.intro', 'font-size'), 'Вводный абзац: 1.25rem').toBe('20px');
  });

  it('первый экран: высота около 40% окна', () => {
    const h = box('.hero').height;
    expect(h, 'Высота .hero при окне 768px — 40vh, то есть около 307px (сейчас ' + h + ')').toBeGreaterThanOrEqual(305);
    expect(h, 'Высота .hero при окне 768px — 40vh, то есть около 307px (сейчас ' + h + ')').toBeLessThanOrEqual(312);
  });

  it('заголовок по центру первого экрана по вертикали', () => {
    const hero = box('.hero');
    const h1 = box('h1');
    const diff = Math.abs((hero.top + hero.height / 2) - (h1.top + h1.height / 2));
    expect(diff, 'Центр h1 совпадает с центром .hero по вертикали').toBeLessThanOrEqual(3);
  });

  it('строка текста: 60–75 символов', () => {
    const chars = charsPerLine('.article p:not(.intro)');
    expect(chars, 'Символов в строке: ' + chars.toFixed(0)).toBeGreaterThanOrEqual(60);
    expect(chars, 'Символов в строке: ' + chars.toFixed(0)).toBeLessThanOrEqual(75);
  });

  it('колонка статьи по центру', () => {
    const b = box('.article p:not(.intro)');
    expect(Math.abs(b.left - (1024 - b.right)), 'Абзац стоит по центру окна').toBeLessThanOrEqual(2);
  });
});
