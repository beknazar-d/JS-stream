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

const text = (id) => $('#' + id + '-error').textContent.trim();

async function fill(address, email, phone) {
  await type('#address', address);
  await type('#email', email);
  await type('#phone', phone);
}

describe('Свои сообщения: исправление ошибок', () => {
  it('после исправления поле снова валидно и форма сохраняется', async () => {
    await fill('Москва, ул. Лесная, 5', 'bad', '+79001234567');
    await submit('#delivery-form');
    expect($('#email').validity.valid, 'Почта неверна после первой отправки').toBe(false);
    await type('#email', 'anna@example.com');
    await submit('#delivery-form');
    expect($('#email').validity.valid, 'Почта исправлена и снова валидна').toBe(true);
    expect($('#status').textContent.trim(), 'Теперь форма сохранена').toBe('Адрес сохранён');
    expect($('#email').getAttribute('aria-invalid'), 'Снят aria-invalid').not.toBe('true');
  });

  it('при вводе в поле его ошибка исчезает сразу', async () => {
    await fill('', 'anna@example.com', '+79001234567');
    await submit('#delivery-form');
    expect(text('address'), 'Ошибка адреса показана').toBe('Введите адрес доставки');
    await type('#address', 'М');
    expect(text('address'), 'После ввода абзац пуст').toBe('');
    expect($('#address').getAttribute('aria-invalid'), 'После ввода нет aria-invalid').not.toBe('true');
    expect($('#address').validity.valid, 'После ввода поле валидно').toBe(true);
  });

  it('проверяются все поля, а не только первое', async () => {
    await fill('', '', '');
    await submit('#delivery-form');
    const invalid = ['address', 'email', 'phone'].filter((id) => $('#' + id).getAttribute('aria-invalid') === 'true');
    expect(invalid, 'Все три поля отмечены').toEqual(['address', 'email', 'phone']);
  });

  it('фокус на телефоне, если неверен только он', async () => {
    await fill('Москва', 'anna@example.com', '123');
    globalThis.__focused.length = 0;
    await submit('#delivery-form');
    expect(globalThis.__focused.at(-1), 'Фокус на телефоне').toBe('phone');
  });

  it('текст ошибки вставлен как текст, а не как разметка', async () => {
    await fill('Москва', 'anna@example.com', '123');
    await submit('#delivery-form');
    expect($('#phone-error').children.length, 'В абзаце ошибки нет вложенных элементов').toBe(0);
  });
});
