describe('Внешний вид не изменился', () => {
  it('цены', () => {
    expect(css('.card:nth-child(1) .price', 'color'), 'Обычная цена тёмно-серая').toBe('rgb(34, 34, 34)');
    expect(css('.card:nth-child(2) .price', 'color'), 'Цена со скидкой красная').toBe('rgb(192, 38, 27)');
    expect(css('.card:nth-child(1) .price', 'font-size'), 'Размер цены').toBe('20px');
  });

  it('плашки', () => {
    expect(css('.card:nth-child(1) .badge', 'background-color'), 'Плашка «Новинка» синяя').toBe('rgb(27, 95, 209)');
    expect(css('.card:nth-child(1) .badge', 'color'), 'Текст плашки белый').toBe('rgb(255, 255, 255)');
    expect(css('.card:nth-child(2) .badge', 'background-color'), 'Плашка «Хит продаж» зелёная').toBe('rgb(27, 122, 58)');
  });

  it('карточки', () => {
    expect(box('.card:nth-child(1)').width, 'Ширина карточки').toBe(220);
    expect(css('.card', 'padding-top'), 'Отступ карточки').toBe('16px');
  });
});
