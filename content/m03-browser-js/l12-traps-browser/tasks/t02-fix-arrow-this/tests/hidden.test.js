describe('Все кнопки и очистка', () => {
  it('работают все три кнопки «В корзину»', async () => {
    await click('.buy[data-id="s-5"]');
    expect($('#cart-count').textContent, 'Счётчик после трёх товаров').toBe('3');
    expect($('#cart-list').textContent, 'В корзине три товара').toBe('k-17, t-2, s-5');
  });

  it('«Очистить» очищает корзину и меняет надпись на кнопке', async () => {
    await click('#clear');
    expect($('#cart-count').textContent, 'Счётчик после очистки').toBe('0');
    expect($('#cart-list').textContent, 'Список после очистки').toBe('');
    expect($('#clear').textContent, 'Надпись на самой кнопке «Очистить»').toBe('Корзина пуста');
  });

  it('после очистки корзину можно наполнить снова', async () => {
    await click('.buy[data-id="s-5"]');
    expect($('#cart-count').textContent, 'Счётчик после очистки и нового товара').toBe('1');
    expect($('#cart-list').textContent, 'Список после очистки и нового товара').toBe('s-5');
  });
});
