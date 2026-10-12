import { tableRows, expectedTotals, readTable, digits, fill } from './helpers.js';

describe('Начальное состояние', () => {
  it('на странице две стартовые строки и верные итоги', () => {
    expect(tableRows(), 'Строк в таблице при загрузке').toHaveLength(2);
    expect($('#total-qty').textContent.trim(), 'Итого штук: 3 + 2').toBe('5');
    expect(digits($('#total-sum').textContent), 'Итого сумма: 3 × 2490 + 2 × 1990').toBe(11450);
  });
});

describe('Добавление и удаление', () => {
  it('форма добавляет строку и пересчитывает итоги', async () => {
    const before = tableRows().length;
    await fill('Утюг Domo S-5', '4', '3490');
    expect(tableRows(), 'Строк после добавления').toHaveLength(before + 1);
    const added = readTable().find((item) => item.name === 'Утюг Domo S-5');
    expect(added, 'Новая позиция должна появиться в таблице').toEqual({ name: 'Утюг Domo S-5', qty: 4, price: 3490 });
    const expected = expectedTotals();
    expect($('#total-qty').textContent.trim(), 'Итого штук после добавления').toBe(String(expected.qty));
    expect(digits($('#total-sum').textContent), 'Итого сумма после добавления').toBe(expected.sum);
    expect($('#name').value, 'Поле названия очищено после добавления').toBe('');
  });

  it('кнопка «Удалить» убирает стартовую строку и пересчитывает итоги', async () => {
    const before = tableRows().length;
    await click('#rows tr:first-child .del');
    expect(tableRows(), 'Строк после удаления').toHaveLength(before - 1);
    const expected = expectedTotals();
    expect($('#total-qty').textContent.trim(), 'Итого штук после удаления').toBe(String(expected.qty));
    expect(digits($('#total-sum').textContent), 'Итого сумма после удаления').toBe(expected.sum);
  });
});
