const withCart = (value) => {
  if (value === undefined) localStorage.removeItem('cart');
  else localStorage.setItem('cart', value);
  return loadCart();
};

describe('Чтение корзины', () => {
  it('при загрузке значок показывает сумму по корректным позициям', () => {
    expect($('#cart-count').textContent, 'Две корректные позиции: 2 + 1 = 3, остальные мусор').toBe('3');
  });

  it('ключа нет: пустая корзина', () => {
    expect(withCart(undefined), 'Нет ключа cart').toEqual([]);
  });

  it('битый JSON: пустая корзина без ошибки', () => {
    expect(withCart('{oops'), 'Значение {oops — не JSON').toEqual([]);
  });

  it('корректная корзина читается как есть', () => {
    expect(withCart('[{"id":2,"qty":3},{"id":5,"qty":1}]'), 'Две корректные позиции').toEqual([
      { id: 2, qty: 3 },
      { id: 5, qty: 1 },
    ]);
  });

  it('saveCart записывает JSON-строку', () => {
    saveCart([{ id: 7, qty: 2 }]);
    expect(localStorage.getItem('cart'), 'В хранилище лежит JSON-строка').toBe('[{"id":7,"qty":2}]');
  });
});
