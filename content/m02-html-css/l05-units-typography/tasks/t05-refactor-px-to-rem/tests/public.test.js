describe('Вид при обычном размере шрифта не изменился', () => {
  it('карточка', () => {
    expect(css('.card', 'padding-top'), 'Внутренний отступ карточки').toBe('20px');
    expect(box('.card').width, 'Ширина карточки').toBe(320);
  });
  it('заголовок', () => {
    expect(css('.card h2', 'font-size'), 'Размер заголовка').toBe('24px');
    expect(css('.card h2', 'line-height'), 'Межстрочье заголовка').toBe('30px');
  });
  it('абзац', () => {
    expect(css('.card p', 'font-size'), 'Размер абзаца').toBe('16px');
    expect(css('.card p', 'line-height'), 'Межстрочье абзаца').toBe('24px');
  });
  it('кнопка', () => {
    expect(css('.btn', 'padding-top'), 'Вертикальный отступ кнопки').toBe('12px');
    expect(css('.btn', 'padding-left'), 'Горизонтальный отступ кнопки').toBe('24px');
    expect(css('.btn', 'font-size'), 'Размер текста кнопки').toBe('16px');
  });
});
