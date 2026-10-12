const levels = () => $$('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName[1]));

describe('Структура заголовков', () => {
  it('на странице один h1 — название страницы', () => {
    expect($$('h1'), 'Заголовков h1').toHaveLength(1);
    expect($('h1').textContent.trim(), 'Текст h1').toBe('Посудомоечные машины');
  });

  it('логотип не заголовок', () => {
    expect($('.logo').matches('h1, h2, h3, h4, h5, h6'), 'Логотип .logo — заголовок').toBe(false);
  });

  it('разделы — h2, модели — h3', () => {
    expect($$('.section-title').map((h) => h.tagName), 'Теги .section-title').toEqual(['H2', 'H2']);
    expect($$('.product-title').map((h) => h.tagName), 'Теги .product-title').toEqual(['H3', 'H3', 'H3', 'H3']);
  });

  it('заголовки идут без пропусков уровней', () => {
    const l = levels();
    expect(l[0], 'Первый заголовок').toBe(1);
    for (let i = 1; i < l.length; i++) {
      expect(l[i] - l[i - 1] <= 1, `Переход h${l[i - 1]} → h${l[i]} пропускает уровень`).toBe(true);
    }
  });
});
