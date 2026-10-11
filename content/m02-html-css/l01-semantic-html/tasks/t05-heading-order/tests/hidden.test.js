describe('Размеры шрифтов не изменились', () => {
  it('размеры заданы как раньше', () => {
    expect(css('.logo', 'font-size'), 'Размер .logo').toBe('14px');
    expect(css('.page-title', 'font-size'), 'Размер .page-title').toBe('28px');
    expect(css('.section-title', 'font-size'), 'Размер .section-title (h2)').toBe('20px');
    for (const el of $$('.product-title')) {
      expect(css(el, 'font-size'), `Размер «${el.textContent.trim()}»`).toBe('16px');
    }
  });

  it('размеры не привязаны к тегам', () => {
    const css = $('style[data-file="styles.css"]').textContent;
    expect(/(^|[\s,}])h[1-6]\s*[,{][^}]*font-size/m.test(css), 'В styles.css есть правило font-size на тег h1–h6').toBe(false);
  });

  it('тексты заголовков не менялись', () => {
    const titles = $$('.page-title, .section-title, .product-title').map((h) => h.textContent.trim());
    expect(titles, 'Тексты заголовков').toEqual([
      'Посудомоечные машины', 'Популярные модели', 'Bosch SMS 25', 'Electrolux ESF 9421',
      'Встраиваемые', 'Hansa ZIM 476', 'Beko DIN 28',
    ]);
  });

  it('логотип остался на месте с тем же текстом', () => {
    expect($('.logo').textContent.trim(), 'Текст логотипа').toBe('Домотека');
  });
});
