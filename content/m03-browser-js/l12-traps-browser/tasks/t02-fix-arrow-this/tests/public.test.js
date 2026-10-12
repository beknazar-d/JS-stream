describe('Кнопка «В корзину»', () => {
  it('клик по кнопке добавляет товар', async () => {
    await click('.buy[data-id="k-17"]');
    expect($('#cart-count').textContent, 'Счётчик после первого товара').toBe('1');
    expect($('#cart-list').textContent, 'Список корзины').toBe('k-17');
  });

  it('клик по значку внутри кнопки работает так же', async () => {
    await click('.buy[data-id="t-2"] .icon');
    expect($('#cart-count').textContent, 'Счётчик после клика по значку').toBe('2');
    expect($('#cart-list').textContent, 'Клик по значку внутри кнопки должен добавить data-id кнопки, а не undefined').toBe('k-17, t-2');
  });
});
