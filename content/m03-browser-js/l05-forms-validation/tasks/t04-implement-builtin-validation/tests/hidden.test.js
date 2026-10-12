globalThis.__hiddenSubmits = 0;
document.addEventListener('submit', (event) => {
  globalThis.__hiddenSubmits++;
  event.preventDefault();
});

const valid = { name: 'Анна Петрова', phone: '+79001234567', email: 'anna@example.com', qty: '2', postcode: '125009', comment: '' };

async function fill(overrides = {}) {
  const values = { ...valid, ...overrides };
  for (const [id, value] of Object.entries(values)) await type('#' + id, value);
}

describe('Встроенная проверка: граничные случаи', () => {
  it('типы полей: tel, email, number', () => {
    expect($('#phone').type, 'Тип телефона').toBe('tel');
    expect($('#email').type, 'Тип почты').toBe('email');
    expect($('#qty').type, 'Тип количества').toBe('number');
  });

  it('шаблон проверяет значение целиком', async () => {
    await fill({ postcode: '1250091' });
    expect($('#postcode').validity.patternMismatch, 'Индекс из семи цифр').toBe(true);
    await fill({ postcode: 'abcdef' });
    expect($('#postcode').validity.patternMismatch, 'Индекс из букв').toBe(true);
    await fill({ phone: '+7900123456' });
    expect($('#phone').validity.patternMismatch, 'Телефон на цифру короче').toBe(true);
    await fill({ phone: '+790012345678' });
    expect($('#phone').validity.patternMismatch, 'Телефон на цифру длиннее').toBe(true);
    await fill({ phone: 'позвоните мне +79001234567' });
    expect($('#phone').validity.patternMismatch, 'Телефон внутри текста').toBe(true);
  });

  it('границы количества включены, дробные значения запрещены', async () => {
    await fill({ qty: '1' });
    expect($('#qty').validity.valid, 'Количество 1 допустимо').toBe(true);
    await fill({ qty: '10' });
    expect($('#qty').validity.valid, 'Количество 10 допустимо').toBe(true);
    await fill({ qty: '1.5' });
    expect($('#qty').validity.valid, 'Количество 1.5 недопустимо').toBe(false);
  });

  it('ограничения длины заданы атрибутами', () => {
    expect($('#name').minLength, 'minlength имени').toBe(2);
    expect($('#comment').maxLength, 'maxlength комментария').toBe(200);
  });

  it('форма с неверными данными не отправляется', async () => {
    globalThis.__hiddenSubmits = 0;
    await fill({ email: 'abc', qty: '0' });
    await submit('#order-form');
    expect(globalThis.__hiddenSubmits, 'Событие submit не должно наступить при неверных данных').toBe(0);
  });

  it('форма с верными данными отправляется', async () => {
    globalThis.__hiddenSubmits = 0;
    await fill();
    await submit('#order-form');
    expect(globalThis.__hiddenSubmits, 'Событие submit наступает один раз').toBe(1);
  });
});
