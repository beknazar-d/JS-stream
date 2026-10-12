const legends = () => $$('form.install fieldset > legend').map((l) => l.textContent.trim());

describe('Структура формы заявки', () => {
  it('группы названы', () => {
    expect(legends().sort(), 'Названия fieldset').toEqual(['Адрес', 'Время приезда', 'Дополнительно', 'Контакты', 'Что устанавливаем'].sort());
  });

  it('у всех полей есть подпись', () => {
    const controls = $$('form.install input, form.install select, form.install textarea');
    expect(controls, 'Элементов управления в форме').toHaveLength(14);
    for (const control of controls) {
      expect(control.labels.length, `У поля «${control.name}» (${control.value || control.type}) есть связанный label`).toBe(1);
    }
  });

  it('типы полей', () => {
    const types = { fullname: 'text', phone: 'tel', email: 'email', units: 'number', date: 'date', city: 'text', street: 'text', zip: 'text', agree: 'checkbox' };
    for (const [name, type] of Object.entries(types)) {
      expect($(`[name="${name}"]`).type, `Тип поля ${name}`).toBe(type);
    }
  });

  it('список моделей сгруппирован', () => {
    const select = $('select[name="model"]');
    expect([...select.options].map((o) => o.value), 'Значения option').toEqual(['', 'msag09', 'as09', 'bfl18']);
    expect($$('select optgroup').map((g) => g.label), 'Названия optgroup').toEqual(['Настенные', 'Напольные']);
  });

  it('кнопка отправки', () => {
    expect($('form.install button').type, 'type кнопки').toBe('submit');
    expect($('form.install button').textContent.trim(), 'Текст кнопки').toBe('Отправить заявку');
  });
});
