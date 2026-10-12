const cards = () => $$('.card');

describe('Оформление карточек', () => {
  it('заголовки по 18px', () => {
    for (const title of $$('.card-title')) {
      expect(css(title, 'font-size'), `Размер заголовка «${title.textContent}»`).toBe('18px');
    }
  });

  it('цена обычной карточки', () => {
    expect(css(cards()[0].querySelector('.price'), 'color'), 'Цвет цены первой карточки').toBe('rgb(179, 45, 0)');
    expect(css(cards()[2].querySelector('.price'), 'color'), 'Цвет цены третьей карточки').toBe('rgb(179, 45, 0)');
  });

  it('цена карточки со скидкой', () => {
    expect(css(cards()[1].querySelector('.price'), 'color'), 'Цвет цены второй карточки (card-sale)').toBe('rgb(208, 0, 0)');
    expect(css(cards()[3].querySelector('.price'), 'color'), 'Цвет цены четвёртой карточки (card-sale)').toBe('rgb(208, 0, 0)');
  });
});
