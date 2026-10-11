describe('Кнопки и ссылки', () => {
  it('«Добавить в корзину» — настоящая кнопка', () => {
    const buy = $('.buy');
    expect(buy.tagName, 'Тег элемента .buy').toBe('BUTTON');
    expect(buy.getAttribute('type'), 'type у кнопки .buy').toBe('button');
  });

  it('«Вернуться в каталог» — ссылка на /catalog', () => {
    const back = $('.back');
    expect(back.tagName, 'Тег элемента .back').toBe('A');
    expect(back.getAttribute('href'), 'Адрес ссылки .back').toBe('/catalog');
  });

  it('«Показать характеристики» — кнопка, а не ссылка', () => {
    expect($('.specs-toggle').tagName, 'Тег элемента .specs-toggle').toBe('BUTTON');
  });

  it('у картинки есть описание', () => {
    expect($('.photo').hasAttribute('alt'), 'У .photo есть атрибут alt').toBe(true);
  });
});
