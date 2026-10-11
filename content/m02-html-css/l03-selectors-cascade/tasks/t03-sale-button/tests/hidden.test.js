describe('Обычные кнопки не изменились', () => {
  it('в панели серая', () => {
    const button = $('.toolbar .btn:not(.btn-sale)');
    expect(css(button, 'background-color'), 'Фон обычной кнопки в панели').toBe('rgb(232, 236, 239)');
    expect(css(button, 'color'), 'Текст обычной кнопки в панели').toBe('rgb(34, 34, 34)');
  });

  it('в карточке синяя', () => {
    const button = $('.product .btn:not(.btn-sale)');
    expect(css(button, 'background-color'), 'Фон обычной кнопки в карточке').toBe('rgb(31, 111, 235)');
    expect(css(button, 'color'), 'Текст обычной кнопки в карточке').toBe('rgb(255, 255, 255)');
  });

  it('нет !important', () => {
    const text = $('style[data-file="styles.css"]').textContent;
    expect(text.includes('!important'), 'В styles.css есть !important').toBe(false);
  });

  it('у кнопок скидки сохранились общие свойства', () => {
    for (const button of $$('.btn-sale')) {
      expect(css(button, 'padding-left'), 'Внутренний отступ слева у кнопки скидки').toBe('16px');
      expect(css(button, 'border-top-left-radius'), 'Скругление у кнопки скидки').toBe('6px');
    }
  });
});
