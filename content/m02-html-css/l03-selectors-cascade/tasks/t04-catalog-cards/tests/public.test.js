const prices = () => $$('.price');

describe('Цены', () => {
  it('цена без старой: красно-коричневая, 16px', () => {
    const price = $$('.card')[1].querySelector('.price');
    expect(css(price, 'color'), 'Цвет цены второй карточки').toBe('rgb(179, 45, 0)');
    expect(css(price, 'font-size'), 'Размер цены без старой').toBe('16px');
  });

  it('цена после старой: красно-коричневая, 20px', () => {
    const price = $('.old-price + .price');
    expect(css(price, 'color'), 'Цвет цены после старой').toBe('rgb(179, 45, 0)');
    expect(css(price, 'font-size'), 'Размер цены после старой').toBe('20px');
  });

  it('старая цена серая и зачёркнутая', () => {
    expect(css('.old-price', 'color'), 'Цвет старой цены').toBe('rgb(107, 114, 128)');
    expect(css('.old-price', 'text-decoration-line'), 'Зачёркивание старой цены').toBe('line-through');
  });

  it('цен три', () => {
    expect(prices(), 'Цен на странице').toHaveLength(3);
  });
});
