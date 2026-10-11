describe('Чистый CSS', () => {
  it('нет !important', () => {
    const text = $('style[data-file="styles.css"]').textContent;
    expect(text.includes('!important'), 'В styles.css есть !important').toBe(false);
  });

  it('нет селекторов по id', () => {
    const selectors = [...document.styleSheets].flatMap((s) => [...s.cssRules]).map((r) => r.selectorText || '');
    const withId = selectors.filter((s) => s.includes('#'));
    expect(withId, 'Селекторы с #').toEqual([]);
  });

  it('содержимое страницы не изменилось', () => {
    expect($$('nav a').map((a) => a.textContent.trim()), 'Ссылки меню').toEqual(['Заказы', 'Склад', 'Отчёты']);
    expect($$('.note').map((p) => p.textContent.trim()), 'Заметки').toEqual(['Данные обновляются раз в час.', 'На складе заканчивается товар.']);
    expect($$('.btn').map((b) => b.textContent.trim()), 'Кнопки').toEqual(['Сохранить', 'Удалить заказ']);
  });

  it('новая кнопка получает стиль без дополнительных ухищрений', () => {
    const button = document.createElement('button');
    button.className = 'btn';
    $('main').append(button);
    expect(css(button, 'background-color'), 'Фон новой кнопки с классом btn').toBe('rgb(31, 111, 235)');
    button.className = 'btn danger';
    expect(css(button, 'background-color'), 'Фон новой кнопки с классами btn danger').toBe('rgb(221, 0, 0)');
    button.remove();
  });
});
