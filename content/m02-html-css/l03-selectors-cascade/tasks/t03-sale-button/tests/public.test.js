const sale = () => $$('.btn-sale');

describe('Кнопки со скидкой', () => {
  it('в панели красная кнопка «Акция»', () => {
    const button = $('.toolbar .btn-sale');
    expect(css(button, 'background-color'), 'Фон кнопки «Акция»').toBe('rgb(221, 0, 0)');
    expect(css(button, 'color'), 'Цвет текста кнопки «Акция»').toBe('rgb(255, 255, 255)');
  });

  it('в карточке красная кнопка «Купить со скидкой»', () => {
    const button = $('.product .btn-sale');
    expect(css(button, 'background-color'), 'Фон кнопки «Купить со скидкой»').toBe('rgb(221, 0, 0)');
    expect(css(button, 'color'), 'Цвет текста').toBe('rgb(255, 255, 255)');
  });

  it('кнопок со скидкой две', () => {
    expect(sale(), 'Кнопок btn-sale на странице').toHaveLength(2);
  });
});
