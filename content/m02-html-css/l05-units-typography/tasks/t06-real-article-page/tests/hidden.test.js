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

describe('Масштабирование и узкий экран', () => {
  it('межстрочье 1.5–1.8 и пересчитывается', () => {
    const p = $('.article p:not(.intro)');
    const ratio = parseFloat(css(p, 'line-height')) / parseFloat(css(p, 'font-size'));
    expect(ratio, 'Отношение line-height к font-size').toBeGreaterThanOrEqual(1.5);
    expect(ratio, 'Отношение line-height к font-size').toBeLessThanOrEqual(1.8);
    p.style.fontSize = '24px';
    try {
      expect(parseFloat(css(p, 'line-height')), 'При шрифте 24px межстрочье не меньше 36px').toBeGreaterThanOrEqual(36);
    } finally {
      p.style.fontSize = '';
    }
  });

  it('при корне 20px заголовки растут, строка остаётся 60–75 символов', () => {
    withRoot(20, () => {
      expect(css('h1', 'font-size'), 'h1 при корне 20px').toBe('50px');
      expect(css('h2', 'font-size'), 'h2 при корне 20px').toBe('35px');
      const chars = charsPerLine('.article p:not(.intro)');
      expect(chars, 'Символов в строке при корне 20px: ' + chars.toFixed(0)).toBeGreaterThanOrEqual(60);
      expect(chars, 'Символов в строке при корне 20px: ' + chars.toFixed(0)).toBeLessThanOrEqual(75);
    });
  });

  it('цитата и список выделены отступом слева', () => {
    expect(parseFloat(css('blockquote', 'padding-left')) + parseFloat(css('blockquote', 'border-left-width')), 'Цитата сдвинута: padding или рамка слева').toBeGreaterThan(8);
    expect(box('blockquote').left, 'Цитата не выходит левее абзацев').toBeGreaterThanOrEqual(box('.article p:not(.intro)').left - 1);
  });

  it('на экране 375px текст не касается краёв', async () => {
    await viewport(375);
    try {
      const b = box('.article p:not(.intro)');
      expect(b.left, 'Поле слева не меньше 16px').toBeGreaterThanOrEqual(16);
      expect(375 - b.right, 'Поле справа не меньше 16px').toBeGreaterThanOrEqual(16);
    } finally {
      await viewport(1024);
    }
  });
});
