const body = () => $('#orders');
const addOrder = (id, statusKey = 'new') => {
  const tr = document.createElement('tr');
  tr.dataset.id = String(id);
  tr.dataset.status = statusKey;
  const cell = document.createElement('td');
  cell.className = 'status';
  cell.textContent = 'Новый';
  const actions = document.createElement('td');
  for (const action of ['confirm', 'cancel', 'delete']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.action = action;
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = action;
    button.append(icon);
    actions.append(button);
  }
  tr.append(document.createElement('td'), cell, actions);
  body().append(tr);
  return tr;
};
const summary = () => $('#summary').textContent.trim();
const freshCount = () => $$('#orders tr[data-status="new"]').length;

describe('Новые строки и статусы', () => {
  it('добавленный заказ подтверждается, сводка растёт и падает', async () => {
    const tr = addOrder(201);
    const other = addOrder(206);
    await click('tr[data-id="201"] [data-action="confirm"]');
    expect(tr.dataset.status, 'Статус нового заказа').toBe('confirmed');
    expect(tr.querySelector('.status').textContent.trim(), 'Текст нового заказа').toBe('Подтверждён');
    expect(summary(), 'Сводка совпадает с числом новых заказов в таблице').toBe(`Новых: ${freshCount()}`);
    expect(freshCount(), 'Заказ 206 остался новым').toBeGreaterThanOrEqual(1);
    tr.remove();
    other.remove();
  });

  it('отменённый заказ нельзя подтвердить', async () => {
    const tr = addOrder(202);
    await click('tr[data-id="202"] [data-action="cancel"]');
    await click('tr[data-id="202"] [data-action="confirm"]');
    expect(tr.dataset.status, 'Статус остался cancelled').toBe('cancelled');
    expect(tr.querySelector('.status').textContent.trim(), 'Текст остался «Отменён»').toBe('Отменён');
    tr.remove();
  });

  it('подтверждённый заказ можно отменить', async () => {
    const tr = addOrder(203);
    await click('tr[data-id="203"] [data-action="confirm"]');
    await click('tr[data-id="203"] [data-action="cancel"]');
    expect(tr.dataset.status, 'Отмена после подтверждения').toBe('cancelled');
    tr.remove();
  });

  it('удалить можно в любом статусе, сводка пересчитывается', async () => {
    addOrder(204);
    const keep = addOrder(207);
    await click('tr[data-id="204"] [data-action="delete"] .icon');
    expect($('#orders tr[data-id="204"]'), 'Строка удалена').toBeNull();
    expect(summary(), 'Сводка совпадает с числом новых заказов после удаления').toBe(`Новых: ${freshCount()}`);
    keep.remove();
  });
});

describe('Клики мимо кнопок', () => {
  it('клик по ячейке ничего не меняет и не падает', async () => {
    const tr = addOrder(205);
    const before = summary();
    await click('tr[data-id="205"] .status');
    await click('#orders');
    expect(tr.dataset.status, 'Статус не изменился').toBe('new');
    expect(summary(), 'Сводка не изменилась').toBe(before);
    tr.remove();
  });
});
