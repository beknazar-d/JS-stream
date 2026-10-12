const totalText = () => $('.line-total').textContent.replace(/\s/g, ' ').trim();
const fire = (type) => $('.qty').dispatchEvent(new Event(type, { bubbles: true }));

describe('Недопустимый ввод при change', () => {
  const cases = [
    ['abc', '1'],
    ['0', '1'],
    ['-5', '1'],
    ['2.7', '2'],
    ['  4 ', '4'],
    ['100', '99'],
    ['7', '7'],
  ];
  for (const [typed, expected] of cases) {
    it(`«${typed}» превращается в ${expected}`, async () => {
      await type('.qty', typed);
      expect($('.qty').value, `Значение в поле после ввода «${typed}»`).toBe(expected);
      expect(totalText(), 'Сумма совпадает со значением поля').toBe(new Intl.NumberFormat('ru-RU').format(2990 * Number(expected)).replace(/\s/g, ' ') + ' ₽');
    });
  }
});

describe('Кнопки', () => {
  it('плюс после ввода 5 даёт 6, а не 51', async () => {
    await type('.qty', '5');
    await click('.plus');
    expect($('.qty').value, 'Значение после плюса').toBe('6');
  });

  it('плюс не выходит за 99', async () => {
    await type('.qty', '99');
    await click('.plus');
    expect($('.qty').value, 'Значение после плюса на максимуме').toBe('99');
  });

  it('минус не опускается ниже 1', async () => {
    await type('.qty', '1');
    await click('.minus');
    expect($('.qty').value, 'Значение после минуса на минимуме').toBe('1');
    expect(totalText(), 'Сумма для 1 штуки').toBe('2 990 ₽');
  });

  it('кнопка опирается на текущий текст поля, даже недопустимый', async () => {
    $('.qty').value = 'abc';
    await click('.plus');
    expect($('.qty').value, 'Из недопустимого значения: 1, затем плюс').toBe('2');
  });
});

describe('Событие input', () => {
  it('во время набора поле не переписывается, сумма меняется только для допустимых чисел', async () => {
    await type('.qty', '2');
    const before = totalText();
    $('.qty').value = 'abc';
    fire('input');
    expect($('.qty').value, 'Поле во время набора не трогаем').toBe('abc');
    expect(totalText(), 'Сумма осталась прежней').toBe(before);
    $('.qty').value = '7';
    fire('input');
    expect($('.qty').value, 'Допустимое значение остаётся').toBe('7');
    expect(totalText(), 'Сумма для 7 штук').toBe('20 930 ₽');
  });

  it('значение вне диапазона во время набора сумму не меняет', async () => {
    await type('.qty', '2');
    const before = totalText();
    $('.qty').value = '500';
    fire('input');
    expect(totalText(), 'Сумма осталась прежней до change').toBe(before);
    expect($('.qty').value, 'Поле до change не исправлено').toBe('500');
    fire('change');
    expect($('.qty').value, 'После change — 99').toBe('99');
  });
});
