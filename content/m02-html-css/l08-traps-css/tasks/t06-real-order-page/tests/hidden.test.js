describe('Починено надёжно', () => {
  it('в стилях нет !important', () => {
    expect($('style[data-file="styles.css"]').textContent, 'В styles.css не должно быть !important').not.toMatch(/!important/);
  });

  it('текст комментария виден целиком и переносится', () => {
    const el = $('.note');
    expect(el.scrollWidth, 'Содержимое комментария не шире блока').toBeLessThanOrEqual(el.clientWidth + 1);
    expect(box('.note').right, 'Правый край комментария внутри окна').toBeLessThanOrEqual(1024 - 24 + 1);
    const range = document.createRange();
    range.selectNodeContents(el);
    const lines = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
    expect(lines.size, 'Комментарий занял несколько строк').toBeGreaterThan(1);
  });

  it('другой длинный адрес тоже не ломает страницу', () => {
    const el = $('.note');
    const old = el.textContent;
    el.textContent = 'https://example.com/' + 'очень-длинный-путь-к-фото-подъезда-'.repeat(8).replace(/-/g, '_');
    try {
      expect(document.documentElement.scrollWidth, 'Ширина страницы').toBeLessThanOrEqual(1024);
    } finally {
      el.textContent = old;
    }
  });

  it('меню растёт, если контента много', () => {
    const p = document.createElement('p');
    p.textContent = 'Подробность заказа. '.repeat(500);
    $('.content').appendChild(p);
    try {
      expect(box('.sidebar').bottom, 'Меню доходит до конца длинной страницы').toBeGreaterThanOrEqual(box('.content').bottom - 2);
    } finally {
      p.remove();
    }
  });

  it('отступ внутри жёлтого блока сохранён и после правки', () => {
    expect(css('.summary h1', 'margin-top'), 'Отступ заголовка по-прежнему 32px').toBe('32px');
    expect(box('.summary').bottom, 'Низ блока ниже абзаца').toBeGreaterThanOrEqual(box('.summary p').bottom);
  });
});
