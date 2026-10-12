import { tableRows, expectedTotals, fill } from './helpers.js';

const totalsMatch = (label) => {
  const expected = expectedTotals();
  expect($('#total-qty').textContent.trim(), label + ': итого штук').toBe(String(expected.qty));
  const sumText = $('#total-sum').textContent;
  expect(sumText, label + ': в сумме нет NaN').not.toContain('NaN');
  expect(Number(sumText.replace(/[^\d.-]/g, '')), label + ': итого сумма').toBe(expected.sum);
};

describe('Удаление в любой строке', () => {
  it('кнопка работает у каждой строки, даже если строки добавляли по очереди', async () => {
    await fill('Фен Vento H-1', '2', '1500');
    await fill('Блендер Domo B-8', '10', '3200');
    totalsMatch('После двух добавлений');
    let count = tableRows().length;
    expect(count, 'Должно быть не меньше трёх строк').toBeGreaterThanOrEqual(3);
    while (count > 0) {
      await click('#rows tr:first-child .del');
      count -= 1;
      expect(tableRows(), 'Строк после удаления верхней').toHaveLength(count);
      totalsMatch('Осталось строк ' + count);
    }
    expect($('#total-qty').textContent.trim(), 'В пустой таблице итого штук').toBe('0');
  });
});

describe('Ввод с формы', () => {
  it('итоги — настоящие числа, а не склейка строк', async () => {
    await fill('Миксер Vento M-3', '10', '2000');
    await fill('Чайник Domo K-9', '5', '1000');
    expect($('#total-qty').textContent.trim(), 'Итого штук: 10 + 5, а не «105»').toBe('15');
    totalsMatch('После двух добавлений');
  });

  it('пустое количество не добавляет строку и объясняет почему', async () => {
    const before = tableRows().length;
    await fill('Утюг без количества', '', '1000');
    expect(tableRows(), 'Строка с пустым количеством не добавляется').toHaveLength(before);
    expect($('#form-error').textContent.trim(), 'Сообщение об ошибке под формой').not.toBe('');
    totalsMatch('После пустого количества');
  });

  it('текст вместо цены не добавляет строку и не даёт NaN', async () => {
    const before = tableRows().length;
    await fill('Утюг с ценой abc', '2', 'abc');
    expect(tableRows(), 'Строка с ценой «abc» не добавляется').toHaveLength(before);
    expect($('#form-error').textContent.trim(), 'Сообщение об ошибке под формой').not.toBe('');
    expect($('main').textContent, 'На странице нет NaN').not.toContain('NaN');
  });

  it('пустое название не добавляет строку', async () => {
    const before = tableRows().length;
    await fill('', '2', '1000');
    expect(tableRows(), 'Строка без названия не добавляется').toHaveLength(before);
    expect($('#form-error').textContent.trim(), 'Сообщение об ошибке').not.toBe('');
  });

  it('после успешного добавления сообщение об ошибке исчезает', async () => {
    await fill('', '2', '1000');
    await fill('Тостер Vento T-5', '1', '1800');
    expect($('#form-error').textContent.trim(), 'Сообщение об ошибке после удачного добавления').toBe('');
  });
});
