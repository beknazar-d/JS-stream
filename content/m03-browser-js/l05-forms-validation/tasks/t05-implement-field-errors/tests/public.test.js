// Фокус проверяем через журнал вызовов focus(): так тест не зависит от того, какое окно сейчас активно.
if (!globalThis.__focusSpy) {
  globalThis.__focusSpy = true;
  globalThis.__focused = [];
  const original = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (...args) {
    globalThis.__focused.push(this.id);
    return original.apply(this, args);
  };
}

globalThis.__submits = 0;
document.addEventListener('submit', (event) => {
  globalThis.__submits++;
  event.preventDefault();
});

const msg = {
  addressMissing: 'Введите адрес доставки',
  emailMissing: 'Введите почту, чтобы мы прислали чек',
  emailBad: 'Почта должна выглядеть так: name@example.com',
  phoneMissing: 'Введите телефон для курьера',
  phoneBad: 'Телефон нужен в формате +79001234567',
};
const text = (id) => $('#' + id + '-error').textContent.trim();

async function fill(address, email, phone) {
  await type('#address', address);
  await type('#email', email);
  await type('#phone', phone);
}

describe('Свои сообщения об ошибках', () => {
  it('пустая форма: у каждого поля своё сообщение', async () => {
    await fill('', '', '');
    await submit('#delivery-form');
    expect(text('address'), 'Сообщение у адреса').toBe(msg.addressMissing);
    expect(text('email'), 'Сообщение у почты').toBe(msg.emailMissing);
    expect(text('phone'), 'Сообщение у телефона').toBe(msg.phoneMissing);
    expect($('#status').textContent.trim(), 'Статус пуст, пока есть ошибки').toBe('');
  });

  it('причина ошибки определяет текст', async () => {
    await fill('Москва, ул. Лесная, 5', 'anna-example.com', '89001234567');
    await submit('#delivery-form');
    expect(text('email'), 'Почта без @').toBe(msg.emailBad);
    expect(text('phone'), 'Телефон не по шаблону').toBe(msg.phoneBad);
    expect(text('address'), 'У верного адреса нет ошибки').toBe('');
  });

  it('поле с ошибкой отмечено для скринридера', async () => {
    await fill('Москва, ул. Лесная, 5', '', '+79001234567');
    await submit('#delivery-form');
    const email = $('#email');
    expect(email.getAttribute('aria-invalid'), 'aria-invalid у неверной почты').toBe('true');
    expect(email.getAttribute('aria-describedby') || '', 'aria-describedby ссылается на абзац ошибки').toContain('email-error');
    expect($('#address').getAttribute('aria-invalid'), 'У верного адреса нет aria-invalid').not.toBe('true');
  });

  it('текст ошибки записан и в validationMessage', async () => {
    await fill('Москва, ул. Лесная, 5', 'anna-example.com', '+79001234567');
    await submit('#delivery-form');
    expect($('#email').validationMessage, 'validationMessage почты').toBe(msg.emailBad);
  });

  it('фокус на первом неверном поле', async () => {
    await fill('Москва, ул. Лесная, 5', '', '');
    globalThis.__focused.length = 0;
    await submit('#delivery-form');
    expect(globalThis.__focused.at(-1), 'Первое неверное поле — почта').toBe('email');
  });

  it('верные данные: ошибок нет, статус «Адрес сохранён»', async () => {
    await fill('Москва, ул. Лесная, 5', 'anna@example.com', '+79001234567');
    await submit('#delivery-form');
    expect($('#status').textContent.trim(), 'Статус после успешной отправки').toBe('Адрес сохранён');
    expect(text('email') + text('phone') + text('address'), 'Абзацы ошибок пусты').toBe('');
    expect($('#delivery-form').checkValidity(), 'Форма валидна').toBe(true);
  });
});
