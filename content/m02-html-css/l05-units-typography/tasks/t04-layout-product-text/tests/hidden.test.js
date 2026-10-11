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

describe('Масштабирование и граничные случаи', () => {
  it('при корне 20px размеры растут, а строка остаётся 60–75 символов', () => {
    withRoot(20, () => {
      expect(css('h1', 'font-size'), 'Заголовок при корне 20px').toBe('40px');
      const chars = charsPerLine('.text');
      expect(chars, 'Символов в строке при корне 20px, ' + chars.toFixed(0)).toBeGreaterThanOrEqual(60);
      expect(chars, 'Символов в строке при корне 20px, ' + chars.toFixed(0)).toBeLessThanOrEqual(75);
    });
  });

  it('межстрочье пересчитывается: число, а не длина', () => {
    const p = $('.text');
    p.style.fontSize = '20px';
    try {
      const ratio = parseFloat(css(p, 'line-height')) / 20;
      expect(ratio, 'Если у абзаца шрифт 20px, межстрочье должно быть от 30px до 36px').toBeGreaterThanOrEqual(1.5);
    } finally {
      p.style.fontSize = '';
    }
  });

  it('вводный абзац не выходит за ширину статьи', () => {
    const lead = box('.lead');
    const art = box('.product');
    expect(lead.right, 'Правая граница .lead внутри статьи').toBeLessThanOrEqual(art.right + 2);
  });

  it('на узком экране текст не касается краёв окна', async () => {
    await viewport(375);
    try {
      const t = box('.text');
      expect(t.left, 'Слева от текста остаётся отступ не меньше 12px').toBeGreaterThanOrEqual(12);
      expect(375 - t.right, 'Справа от текста остаётся отступ не меньше 12px').toBeGreaterThanOrEqual(12);
    } finally {
      await viewport(1024);
    }
  });
});
