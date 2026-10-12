const rows = () => $$('#cart-list .cart-row').map((li) => li.querySelector('.title').textContent);

describe('Удаление строк', () => {
  it('клик по кнопке удаляет строку', async () => {
    await click('.cart-row:nth-child(1) .remove');
    expect(rows(), 'Остались блендер и тостер').toEqual(['Блендер B-50', 'Тостер T-2']);
  });

  it('клик по значку внутри кнопки тоже удаляет строку', async () => {
    await click('.cart-row:nth-child(1) .remove__icon');
    expect(rows(), 'Остался только тостер').toEqual(['Тостер T-2']);
  });

  it('счётчик обновляется', () => {
    expect($('#count').textContent.trim(), 'Текст счётчика').toBe('Позиций: 1');
  });
});
