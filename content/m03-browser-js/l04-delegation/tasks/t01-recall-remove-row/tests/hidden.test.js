const make = (title) => {
  const li = document.createElement('li');
  li.className = 'cart-row';
  const span = document.createElement('span');
  span.className = 'title';
  span.textContent = title;
  const button = document.createElement('button');
  button.className = 'remove';
  button.type = 'button';
  const icon = document.createElement('span');
  icon.className = 'remove__icon';
  icon.textContent = '×';
  button.append(icon);
  li.append(span, ' ', button);
  return li;
};

describe('Делегирование', () => {
  it('строка, добавленная после загрузки, удаляется', async () => {
    const list = $('#cart-list');
    list.append(make('Фен F-9'), make('Миксер M-7'));
    const before = $$('#cart-list .cart-row').length;
    await click('.cart-row:last-child .remove__icon');
    expect($$('#cart-list .cart-row'), 'Одна строка убрана').toHaveLength(before - 1);
    expect($$('#cart-list .title').map((el) => el.textContent), 'Миксер удалён, фен остался').toContain('Фен F-9');
    expect($('#count').textContent.trim(), 'Счётчик').toBe(`Позиций: ${before - 1}`);
  });

  it('клик по названию ничего не удаляет', async () => {
    const before = $$('#cart-list .cart-row').length;
    await click('.cart-row .title');
    expect($$('#cart-list .cart-row'), 'Число строк не изменилось').toHaveLength(before);
  });

  it('клик по пустому месту списка ничего не удаляет и не падает', async () => {
    const before = $$('#cart-list .cart-row').length;
    await click('#cart-list');
    expect($$('#cart-list .cart-row'), 'Число строк не изменилось').toHaveLength(before);
  });

  it('удаляется именно нажатая строка, а не первая', async () => {
    const list = $('#cart-list');
    list.append(make('Весы'), make('Кофеварка'));
    await click('.cart-row:last-child .remove');
    const titles = $$('#cart-list .title').map((el) => el.textContent);
    expect(titles, 'Кофеварка удалена').not.toContain('Кофеварка');
    expect(titles, 'Весы остались').toContain('Весы');
  });
});
