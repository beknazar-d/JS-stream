describe('Проверка формы браузером', () => {
  it('пустая форма не проходит', () => {
    expect($('form.checkout').checkValidity(), 'Пустая форма').toBe(false);
  });

  it('выбор по умолчанию в списке — подсказка', () => {
    const city = $('[name="city"]');
    expect(city.value, 'Выбранное значение списка city').toBe('');
    expect(city.options[0].textContent.trim(), 'Текст первого пункта').toBe('Выберите город');
    expect([...city.options].map((o) => o.value), 'Значения пунктов списка').toEqual(['', 'msk', 'kzn', 'tver']);
    expect(city.validity.valueMissing, 'Пока город не выбран, поле считается пустым').toBe(true);
  });

  it('после заполнения обязательных полей проверка проходит, email можно не писать', async () => {
    await type('[name="name"]', 'Анна Смирнова');
    await type('[name="phone"]', '+79001234567');
    await type('[name="city"]', 'kzn');
    await type('[name="address"]', 'ул. Баумана, 5');
    await type('[name="date"]', '2026-12-01');
    expect($('form.checkout').checkValidity(), 'Все обязательные поля заполнены').toBe(true);
  });

  it('неправильный email ломает проверку', async () => {
    await type('[name="email"]', 'abc');
    expect($('form.checkout').checkValidity(), 'В email записано «abc»').toBe(false);
    await type('[name="email"]', 'anna@example.ru');
    expect($('form.checkout').checkValidity(), 'В email нормальный адрес').toBe(true);
  });

  it('автозаполнение и ограничения', () => {
    expect($('[name="name"]').autocomplete, 'autocomplete у name').toBe('name');
    expect($('[name="phone"]').autocomplete, 'autocomplete у phone').toBe('tel');
    expect($('[name="email"]').autocomplete, 'autocomplete у email').toBe('email');
    expect($('[name="address"]').autocomplete, 'autocomplete у address').toBe('street-address');
    expect($('[name="comment"]').maxLength, 'maxlength у комментария').toBe(300);
  });

  it('оплата: две радиокнопки, по умолчанию карта', () => {
    const radios = $$('[name="payment"]');
    expect(radios.map((r) => r.value), 'Значения переключателей').toEqual(['card', 'cash']);
    expect(radios.map((r) => r.checked), 'Какой выбран по умолчанию').toEqual([true, false]);
    expect(radios.every((r) => r.labels.length === 1), 'У каждого переключателя есть label').toBe(true);
    expect(radios[0].closest('fieldset').querySelector('legend').textContent.trim(), 'Радиокнопки лежат в группе «Оплата»').toBe('Оплата');
  });
});
