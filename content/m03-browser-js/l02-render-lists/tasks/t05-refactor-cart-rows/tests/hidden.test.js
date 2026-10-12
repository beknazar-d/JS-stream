describe('Рефакторинг: узлы не пересоздаются', () => {
  it('прежние строки остаются теми же узлами после добавления', () => {
    const first = $('.cart-row:nth-child(1)');
    const second = $('.cart-row:nth-child(2)');
    addRow({ id: 't2', title: 'Тостер T-2', qty: 3 });
    expect($('.cart-row:nth-child(1)') === first, 'Первая строка — тот же узел').toBe(true);
    expect($('.cart-row:nth-child(2)') === second, 'Вторая строка — тот же узел').toBe(true);
    expect($$('.cart-row'), 'Теперь три строки').toHaveLength(3);
    expect($('.cart-row:nth-child(3)').dataset.id, 'Новая строка в конце').toBe('t2');
  });

  it('счётчик обновляется после добавления', () => {
    expect($('.cart-total').textContent.trim(), 'После третьей строки').toBe('Позиций: 3');
  });

  it('название со скобками остаётся текстом', () => {
    addRow({ id: 'x', title: 'Миксер <PRO> & Co', qty: 1 });
    const row = $('.cart-row:last-child');
    expect(row.querySelector('.cart-row__title').textContent, 'Название как есть').toBe('Миксер <PRO> & Co');
    expect(row.children.length, 'В строке ровно два span').toBe(2);
    expect($('.cart-total').textContent.trim(), 'Счётчик').toBe('Позиций: 4');
  });

  it('введённый на странице фокус не теряется', () => {
    const row = $('.cart-row:nth-child(1)');
    row.tabIndex = 0;
    row.focus();
    addRow({ id: 'z', title: 'Весы', qty: 1 });
    expect(document.activeElement === row, 'Фокус остался на прежней строке').toBe(true);
  });
});
