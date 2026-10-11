describe('Форма подписки: проверка браузером', () => {
  it('пустое поле не проходит проверку', () => {
    expect($('form').checkValidity(), 'Пустая форма').toBe(false);
  });

  it('нормальный адрес проходит, строка без @ нет', async () => {
    await type('#email', 'anna@example.ru');
    expect($('form').checkValidity(), 'Адрес anna@example.ru').toBe(true);
    await type('#email', 'abc');
    expect($('form').checkValidity(), 'Строка «abc» не адрес').toBe(false);
  });

  it('браузер знает, что это почта', () => {
    expect($('#email').autocomplete, 'autocomplete поля').toBe('email');
  });

  it('подпись видна на странице, а не только в атрибуте', () => {
    expect(labelOf('#email'), 'Доступное имя поля').toBe('Ваш email');
    expect($('label[for="email"]').textContent.trim().length > 0, 'У label есть текст').toBe(true);
  });
});
