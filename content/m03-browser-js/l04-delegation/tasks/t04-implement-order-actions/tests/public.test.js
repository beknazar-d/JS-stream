const row = (id) => $(`#orders tr[data-id="${id}"]`);
const status = (id) => row(id)?.querySelector('.status').textContent.trim();

describe('Действия над заказами', () => {
  it('«Подтвердить» меняет статус и текст', async () => {
    await click('tr[data-id="101"] [data-action="confirm"]');
    expect(row('101').dataset.status, 'data-status заказа 101').toBe('confirmed');
    expect(status('101'), 'Текст статуса').toBe('Подтверждён');
  });

  it('«Отменить» меняет статус и текст, в том числе по значку', async () => {
    await click('tr[data-id="102"] .icon');
    expect(row('102').dataset.status, 'data-status заказа 102 после клика по значку').toBe('cancelled');
    expect(status('102'), 'Текст статуса').toBe('Отменён');
  });

  it('«Удалить» убирает строку', async () => {
    await click('tr[data-id="103"] [data-action="delete"]');
    expect(row('103'), 'Строка 103 удалена').toBeNull();
  });

  it('сводка «Новых» пересчитана', () => {
    expect($('#summary').textContent.trim(), 'Все три заказа перестали быть новыми').toBe('Новых: 0');
  });
});
