const legends = () => $$('form.checkout > fieldset > legend').map((l) => l.textContent.trim());

describe('Структура формы заказа', () => {
  it('три группы с названиями', () => {
    expect(legends(), 'Названия групп (fieldset > legend)').toEqual(['Контакты', 'Доставка', 'Оплата']);
  });

  it('у всех полей есть подпись', () => {
    const controls = $$('form.checkout input:not([type="radio"]), form.checkout select, form.checkout textarea');
    expect(controls, 'Полей, списков и текстовых областей').toHaveLength(7);
    for (const control of controls) {
      expect(control.labels.length, `У поля «${control.name}» есть связанный label`).toBe(1);
    }
  });

  it('поля нужного типа', () => {
    expect($('[name="phone"]').type, 'Тип phone').toBe('tel');
    expect($('[name="email"]').type, 'Тип email').toBe('email');
    expect($('[name="date"]').type, 'Тип date').toBe('date');
    expect($('[name="city"]').tagName, 'Тег city').toBe('SELECT');
    expect($('[name="comment"]').tagName, 'Тег comment').toBe('TEXTAREA');
  });

  it('кнопка отправки', () => {
    const button = $('form.checkout button');
    expect(button.type, 'type кнопки').toBe('submit');
    expect(button.textContent.trim(), 'Текст кнопки').toBe('Подтвердить заказ');
  });
});
