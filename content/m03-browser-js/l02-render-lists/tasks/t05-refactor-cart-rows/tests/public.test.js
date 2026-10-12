const rows = () => $$('.cart-list .cart-row');

describe('Строки корзины', () => {
  it('две строки с названием и количеством', () => {
    expect(rows(), 'Количество строк').toHaveLength(2);
    expect(rows().map((r) => r.querySelector('.cart-row__title').textContent), 'Названия').toEqual(['Чайник K-200', 'Блендер B-50']);
    expect(rows().map((r) => r.querySelector('.cart-row__qty').textContent), 'Количество').toEqual(['× 1', '× 2']);
  });

  it('data-id записан', () => {
    expect(rows().map((r) => r.dataset.id), 'Идентификаторы').toEqual(['k200', 'b50']);
  });

  it('счётчик позиций', () => {
    expect($('.cart-total').textContent.trim(), 'Текст счётчика').toBe('Позиций: 2');
  });
});
