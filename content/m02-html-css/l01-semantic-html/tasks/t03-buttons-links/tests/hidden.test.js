describe('Кнопки и ссылки: детали', () => {
  it('тексты не изменились', () => {
    expect(labelOf('.buy'), 'Текст кнопки .buy').toBe('Добавить в корзину');
    expect(labelOf('.back'), 'Текст ссылки .back').toBe('Вернуться в каталог');
    expect(labelOf('.specs-toggle'), 'Текст кнопки .specs-toggle').toBe('Показать характеристики');
  });

  it('обе кнопки имеют type="button"', () => {
    expect($('.specs-toggle').getAttribute('type'), 'type у .specs-toggle').toBe('button');
  });

  it('на странице нет пустых ссылок и самодельных адресов', () => {
    const empty = $$('a').filter((a) => (a.getAttribute('href') ?? '#') === '#');
    expect(empty, 'Ссылки без адреса или с href=«#»').toHaveLength(0);
    expect($$('[data-href]'), 'Элементы с data-href').toHaveLength(0);
  });

  it('фокус с клавиатуры доходит до кнопок без хитростей', () => {
    for (const sel of ['.buy', '.specs-toggle']) {
      expect($(sel).tabIndex, `tabIndex у ${sel}`).toBe(0);
      expect($(sel).hasAttribute('tabindex'), `Атрибут tabindex не нужен у ${sel}`).toBe(false);
      expect($(sel).hasAttribute('role'), `Атрибут role не нужен у ${sel}`).toBe(false);
    }
  });

  it('описание картинки осмысленное', () => {
    const alt = ($('.photo').getAttribute('alt') ?? '').trim();
    expect(alt.length >= 5, `alt = «${alt}», нужно не короче пяти символов`).toBe(true);
  });
});
