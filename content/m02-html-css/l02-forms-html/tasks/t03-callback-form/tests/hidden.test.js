describe('Типы полей и кнопка', () => {
  it('типы подходят к данным', () => {
    expect($('[name="name"]').type, 'Тип поля name').toBe('text');
    expect($('[name="phone"]').type, 'Тип поля phone').toBe('tel');
    expect($('[name="email"]').type, 'Тип поля email').toBe('email');
    expect($('[name="qty"]').type, 'Тип поля qty').toBe('number');
  });

  it('браузер проверяет почту', async () => {
    await type('[name="email"]', 'abc');
    expect($('[name="email"]').validity.typeMismatch, 'Строка «abc» не почта').toBe(true);
    await type('[name="email"]', 'anna@example.ru');
    expect($('[name="email"]').validity.valid, 'Адрес anna@example.ru').toBe(true);
  });

  it('кнопка отправляет форму', () => {
    expect($('form button').type, 'type кнопки').toBe('submit');
  });

  it('подписи видимые, а не только в aria-label', () => {
    expect($$('[aria-label]'), 'Элементов с aria-label').toHaveLength(0);
    for (const name of ['name', 'phone', 'email', 'qty']) {
      expect(labelOf(`[name="${name}"]`).length > 0, `Доступное имя поля ${name}`).toBe(true);
    }
  });

  it('id полей уникальны', () => {
    const ids = $$('[id]').map((el) => el.id);
    expect(new Set(ids).size, 'Повторяющиеся id на странице').toBe(ids.length);
  });
});
