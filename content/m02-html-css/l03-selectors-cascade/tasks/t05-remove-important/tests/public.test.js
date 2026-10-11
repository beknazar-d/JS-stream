describe('Вид страницы сохранён', () => {
  it('ссылки меню', () => {
    const [orders, stock] = $$('nav a');
    expect(css(orders, 'color'), 'Цвет обычной ссылки').toBe('rgb(51, 51, 51)');
    expect(css(stock, 'color'), 'Цвет активной ссылки').toBe('rgb(221, 0, 0)');
    expect(css(stock, 'font-weight'), 'Жирность активной ссылки').toBe('700');
    expect(css(orders, 'font-weight'), 'Жирность обычной ссылки').toBe('400');
  });

  it('заметки', () => {
    const [note, warning] = $$('.note');
    expect(css(note, 'background-color'), 'Фон заметки').toBe('rgb(238, 238, 255)');
    expect(css(warning, 'background-color'), 'Фон предупреждения').toBe('rgb(255, 238, 238)');
    expect(css(note, 'padding-top'), 'Отступ заметки').toBe('8px');
    expect(css(warning, 'padding-top'), 'Отступ предупреждения').toBe('8px');
  });

  it('кнопки', () => {
    const [save, remove] = $$('.btn');
    expect(css(save, 'background-color'), 'Фон обычной кнопки').toBe('rgb(31, 111, 235)');
    expect(css(save, 'color'), 'Текст обычной кнопки').toBe('rgb(255, 255, 255)');
    expect(css(remove, 'background-color'), 'Фон опасной кнопки').toBe('rgb(221, 0, 0)');
    expect(css(remove, 'color'), 'Текст опасной кнопки').toBe('rgb(255, 255, 255)');
  });
});
