// Страховка: считаем отправки и не даём странице перезагрузиться.
globalThis.__submits = 0;
document.addEventListener('submit', (event) => {
  globalThis.__submits++;
  event.preventDefault();
});

const valid = { name: 'Анна Петрова', phone: '+79001234567', email: 'anna@example.com', qty: '2', postcode: '125009', comment: '' };

async function fill(overrides = {}) {
  const values = { ...valid, ...overrides };
  for (const [id, value] of Object.entries(values)) await type('#' + id, value);
}

describe('Встроенная проверка формы заказа', () => {
  it('верные данные проходят проверку', async () => {
    await fill();
    expect($('#order-form').checkValidity(), 'Форма с верными данными валидна').toBe(true);
  });

  for (const id of ['name', 'phone', 'email', 'qty', 'postcode']) {
    it(`поле #${id} обязательное`, async () => {
      await fill({ [id]: '' });
      expect($('#' + id).validity.valueMissing, `Пустое поле #${id} должно быть отмечено как незаполненное`).toBe(true);
    });
  }

  it('комментарий необязательный', async () => {
    await fill({ comment: '' });
    expect($('#comment').validity.valid, 'Пустой комментарий допустим').toBe(true);
  });

  it('почта без @ не проходит', async () => {
    await fill({ email: 'anna-example.com' });
    expect($('#email').validity.typeMismatch, 'Адрес без @ — несоответствие типу email').toBe(true);
  });

  it('телефон только в формате +7 и десять цифр', async () => {
    await fill({ phone: '89001234567' });
    expect($('#phone').validity.patternMismatch, 'Телефон 89001234567 не подходит').toBe(true);
  });

  it('индекс из пяти цифр не проходит', async () => {
    await fill({ postcode: '12500' });
    expect($('#postcode').validity.patternMismatch, 'Индекс из пяти цифр').toBe(true);
  });

  it('количество вне границ не проходит', async () => {
    await fill({ qty: '0' });
    expect($('#qty').validity.rangeUnderflow, 'Количество 0').toBe(true);
    await fill({ qty: '11' });
    expect($('#qty').validity.rangeOverflow, 'Количество 11').toBe(true);
  });
});
