const form = () => $('form.install');
const fill = async (overrides = {}) => {
  const data = { fullname: 'Анна Смирнова', phone: '+79001234567', model: 'as09', units: '2', date: '2026-12-01', city: 'Тверь', street: 'ул. Мира, 7', zip: '170100', ...overrides };
  for (const [name, value] of Object.entries(data)) await type(`[name="${name}"]`, value);
};

describe('Проверка заявки браузером', () => {
  it('пустая форма не проходит', () => {
    expect(form().checkValidity(), 'Пустая форма').toBe(false);
  });

  it('время приезда обязательно', async () => {
    await fill();
    await click('[name="agree"]');
    expect(form().checkValidity(), 'Время приезда не выбрано').toBe(false);
    expect($('[name="slot"]').validity.valueMissing, 'Для группы slot значение не выбрано').toBe(true);
    await click('#slot-day');
    expect(form().checkValidity(), 'Всё заполнено, время выбрано').toBe(true);
  });

  it('количество блоков от 1 до 5', async () => {
    for (const [value, ok] of [['0', false], ['6', false], ['1', true], ['5', true]]) {
      await type('[name="units"]', value);
      expect($('[name="units"]').validity.valid, `Количество ${value}`).toBe(ok);
    }
  });

  it('индекс — ровно шесть цифр', async () => {
    for (const [value, ok] of [['12345', false], ['12345a', false], ['1234567', false], ['123456', true], ['012345', true]]) {
      await type('[name="zip"]', value);
      expect($('[name="zip"]').validity.valid, `Индекс «${value}»`).toBe(ok);
    }
  });

  it('согласие обязательно, email нет', async () => {
    expect($('[name="agree"]').required, 'agree обязателен').toBe(true);
    expect($('[name="email"]').required, 'email необязателен').toBe(false);
    expect($('[name="comment"]').maxLength, 'maxlength комментария').toBe(500);
  });

  it('подсказки автозаполнения и цифровая клавиатура', () => {
    const tokens = { fullname: 'name', phone: 'tel', email: 'email', city: 'address-level2', street: 'street-address', zip: 'postal-code' };
    for (const [name, token] of Object.entries(tokens)) {
      expect($(`[name="${name}"]`).autocomplete, `autocomplete у ${name}`).toBe(token);
    }
    expect($('[name="zip"]').inputMode, 'inputmode у индекса').toBe('numeric');
  });

  it('значения времени приезда и количество по умолчанию', () => {
    expect($$('[name="slot"]').map((r) => r.value), 'Значения slot').toEqual(['morning', 'day', 'evening']);
    expect($$('[name="slot"]').some((r) => r.hasAttribute('checked')), 'В разметке ни один вариант времени заранее не отмечен').toBe(false);
    expect($('#units').getAttribute('value'), 'Значение units по умолчанию').toBe('1');
    expect($('#units').step, 'step у units').toBe('1');
  });
});
