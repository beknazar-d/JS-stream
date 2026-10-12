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

globalThis.__submits = [];
document.addEventListener('submit', (event) => {
  globalThis.__submits.push(event.defaultPrevented);
  event.preventDefault();
});

const errorText = (id) => $('#' + id + '-error').textContent.trim();

async function fill({ name = '', phone = '', method = 'delivery', address = '', promo = '' }) {
  await type('#name', name);
  await type('#phone', phone);
  await type('#address', address);
  await type('#promo', promo);
  const radio = $('input[name="method"][value="' + method + '"]');
  radio.checked = true;
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('Оформление заказа: основное поведение', () => {
  it('страница не перезагружается', async () => {
    globalThis.__submits.length = 0;
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect(globalThis.__submits, 'Одна отправка формы').toHaveLength(1);
    expect(globalThis.__submits[0], 'Обработчик вызвал preventDefault').toBe(true);
  });

  it('верная доставка: в сводке имя и способ', async () => {
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    const text = $('#summary').textContent;
    expect(text, 'Сводка содержит имя').toContain('Анна');
    expect(text, 'Сводка содержит способ получения').toContain('Доставка');
    expect(errorText('name') + errorText('phone') + errorText('address'), 'Ошибок нет').toBe('');
  });

  it('верный самовывоз: в сводке слово «Самовывоз»', async () => {
    await fill({ name: 'Игорь', phone: '+79001234567', method: 'pickup', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    const text = $('#summary').textContent;
    expect(text, 'Сводка содержит имя').toContain('Игорь');
    expect(text, 'Сводка содержит способ получения').toContain('Самовывоз');
  });

  it('пустое имя: ошибка под полем', async () => {
    await fill({ name: '', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect(errorText('name'), 'Текст ошибки под именем').not.toBe('');
    expect($('#name').getAttribute('aria-invalid'), 'aria-invalid у имени').toBe('true');
    expect($('#name').getAttribute('aria-describedby') || '', 'aria-describedby у имени').toContain('name-error');
    expect($('#summary').textContent.trim(), 'Сводка пуста при ошибках').toBe('');
  });

  it('телефон abc и пустой телефон — ошибки', async () => {
    await fill({ name: 'Анна', phone: 'abc', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect(errorText('phone'), 'Ошибка при телефоне abc').not.toBe('');
    await fill({ name: 'Анна', phone: '', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect(errorText('phone'), 'Ошибка при пустом телефоне').not.toBe('');
  });

  it('доставка без адреса — ошибка', async () => {
    await fill({ name: 'Анна', phone: '+79001234567', address: '' });
    await submit('#checkout-form');
    expect(errorText('address'), 'Ошибка под адресом').not.toBe('');
    expect($('#address').getAttribute('aria-invalid'), 'aria-invalid у адреса').toBe('true');
  });
});
