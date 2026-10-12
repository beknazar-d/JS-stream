const scaled = (el, prop, rootPx) => {
  document.documentElement.style.fontSize = rootPx + 'px';
  try { return parseFloat(css(el, prop)); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Базовая типографика', () => {
  it('основной шрифт: стек из нескольких шрифтов с общим семейством в конце', () => {
    const family = css('body', 'font-family');
    expect(family.split(',').length, 'В стеке font-family должно быть не меньше трёх шрифтов').toBeGreaterThanOrEqual(3);
    expect(family.trim(), 'Последним в стеке стоит sans-serif').toMatch(/sans-serif$/);
  });

  it('размеры текста при корне 16px', () => {
    expect(css('h1', 'font-size'), 'Заголовок h1: 2rem').toBe('32px');
    expect(css('.lead', 'font-size'), 'Вводный абзац: 1.25rem').toBe('20px');
    expect(css('.text', 'font-size'), 'Основной текст: 1rem').toBe('16px');
    expect(css('.note', 'font-size'), 'Примечание: 0.875rem').toBe('14px');
  });

  it('межстрочное расстояние 1.5 от размера шрифта', () => {
    expect(css('.text', 'line-height'), 'Основной текст при 16px: 24px').toBe('24px');
  });
});
