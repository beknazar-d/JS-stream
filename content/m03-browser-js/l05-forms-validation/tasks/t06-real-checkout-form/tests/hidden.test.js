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

describe('Оформление заказа: проверки и сброс', () => {
  it('все поля пусты: три ошибки и фокус на имени', async () => {
    await fill({});
    globalThis.__focused.length = 0;
    await submit('#checkout-form');
    for (const id of ['name', 'phone', 'address']) {
      expect(errorText(id), `Ошибка под полем ${id}`).not.toBe('');
      expect($('#' + id).getAttribute('aria-invalid'), `aria-invalid у ${id}`).toBe('true');
    }
    expect(globalThis.__focused.at(-1), 'Фокус на первом неверном поле').toBe('name');
  });

  it('фокус на первом неверном поле, а не на имени', async () => {
    await fill({ name: 'Анна', phone: 'abc', address: '' });
    globalThis.__focused.length = 0;
    await submit('#checkout-form');
    expect(globalThis.__focused.at(-1), 'Фокус на телефоне').toBe('phone');
  });

  it('после исправления ошибки пропадают, сводка появляется', async () => {
    await fill({ name: '', phone: 'abc', address: '' });
    await submit('#checkout-form');
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    for (const id of ['name', 'phone', 'address']) {
      expect(errorText(id), `Абзац ошибки ${id} очищен`).toBe('');
      expect($('#' + id).getAttribute('aria-invalid'), `aria-invalid у ${id} снят`).not.toBe('true');
    }
    expect($('#summary').textContent, 'Сводка появилась').toContain('Анна');
  });

  it('новая ошибка заменяет сводку', async () => {
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    await fill({ name: '', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect($('#summary').textContent.trim(), 'Сводка пропадает, если форма снова неверна').toBe('');
  });

  it('пустой промокод допустим, непустой не мешает', async () => {
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5', promo: '' });
    await submit('#checkout-form');
    expect($('#summary').textContent, 'Заказ без промокода принят').toContain('Анна');
    await fill({ name: 'Анна', phone: '+79001234567', address: 'Москва, Лесная, 5', promo: 'ВЕСНА10' });
    await submit('#checkout-form');
    expect($('#summary').textContent, 'Заказ с промокодом принят').toContain('Анна');
  });

  it('имя вставляется как текст, а не как разметка', async () => {
    await fill({ name: '<b>Анна</b>', phone: '+79001234567', address: 'Москва, Лесная, 5' });
    await submit('#checkout-form');
    expect($('#summary').querySelector('b'), 'В сводке нет вложенных тегов').toBeNull();
    expect($('#summary').textContent, 'Разметка видна как текст').toContain('<b>Анна</b>');
  });
});
