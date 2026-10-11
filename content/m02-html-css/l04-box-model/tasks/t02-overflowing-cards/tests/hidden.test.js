describe('Дизайн сохранён', () => {
  it('отступы и рамки на месте', () => {
    for (const card of $$('.card')) {
      expect(css(card, 'padding-left'), 'Внутренний отступ карточки').toBe('20px');
      expect(css(card, 'border-left-width'), 'Рамка карточки').toBe('2px');
    }
    expect(css('.search', 'padding-left'), 'Внутренний отступ поля поиска').toBe('8px');
  });

  it('нет горизонтальной прокрутки', () => {
    const panel = $('.panel');
    expect(panel.scrollWidth, 'scrollWidth панели').toBe(panel.clientWidth);
    expect(document.documentElement.scrollWidth <= document.documentElement.clientWidth, 'На странице нет горизонтальной прокрутки').toBe(true);
  });

  it('переполнение не спрятано', () => {
    expect(css('.panel', 'overflow-x'), 'overflow панели').toBe('visible');
  });

  it('карточки идут друг под другом с отступом 12px', () => {
    const cards = $$('.card').map((c) => box(c));
    expect(cards[1].top - cards[0].bottom, 'Расстояние между карточками 1 и 2').toBe(12);
    expect(cards[2].top - cards[1].bottom, 'Расстояние между карточками 2 и 3').toBe(12);
  });
});
