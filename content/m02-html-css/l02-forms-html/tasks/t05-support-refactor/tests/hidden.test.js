describe('Группа темы и обязательные поля', () => {
  it('переключатели в fieldset с названием', () => {
    const radios = $$('[name="topic"]');
    expect(radios.map((r) => r.value), 'Значения тем').toEqual(['delivery', 'return', 'other']);
    const group = radios[0].closest('fieldset');
    expect(group, 'Переключатели лежат в fieldset').not.toBeNull();
    expect(group.querySelector('legend').textContent.trim(), 'Название группы').toBe('Тема обращения');
    expect(radios.every((r) => r.closest('fieldset') === group), 'Все три в одном fieldset').toBe(true);
    expect(radios.every((r) => r.labels.length === 1), 'У каждой темы есть label').toBe(true);
  });

  it('обязательные поля заданы, остальные нет', () => {
    expect($('[name="email"]').required, 'email обязателен').toBe(true);
    expect($('[name="message"]').required, 'message обязательно').toBe(true);
    expect($('[name="agree"]').required, 'agree обязательно').toBe(true);
    expect($('[name="name"]').required, 'name необязательно').toBe(false);
    expect($('[name="order"]').required, 'order необязательно').toBe(false);
  });

  it('форма проходит проверку после заполнения обязательных полей', async () => {
    expect($('form.support').checkValidity(), 'Пустая форма').toBe(false);
    await type('[name="email"]', 'anna@example.ru');
    await type('[name="message"]', 'Где мой заказ?');
    await click('[name="agree"]');
    expect($('form.support').checkValidity(), 'Обязательные поля заполнены').toBe(true);
  });

  it('форма отправляется, а имена полей прежние', async () => {
    $('[name="agree"]').checked = true;
    let sent = null;
    $('form.support').addEventListener('submit', (event) => {
      event.preventDefault();
      sent = [...new FormData(event.target).keys()];
    });
    await submit('form.support');
    expect(sent, 'Имена отправленных полей').toEqual(['name', 'email', 'order', 'message', 'agree']);
  });

  it('нет aria-label вместо подписей', () => {
    expect($$('[aria-label]'), 'Элементов с aria-label').toHaveLength(0);
  });
});
