const readCart = () => JSON.parse(localStorage.getItem('cart'));

describe('Сохранение корзины: тонкости', () => {
  it('ещё два добавления подряд сохраняются без потерь', async () => {
    await click('#products li:nth-child(2) .add');
    await click('#products li:nth-child(2) .add');
    expect(readCart().map((item) => item.id), 'Порядок добавления сохранён').toEqual([3, 1, 2, 2]);
    expect($('#cart-count').textContent, 'Счётчик совпадает с длиной массива').toBe(String(readCart().length));
  });

  it('очистка оставляет в хранилище пустой массив', async () => {
    await click('#clear');
    expect($('#cart-count').textContent, 'На странице 0 товаров').toBe('0');
    expect(localStorage.getItem('cart'), 'В хранилище строка «[]», а не удалённый ключ').toBe('[]');
  });

  it('после очистки корзина снова наполняется', async () => {
    await click('#products li:nth-child(3) .add');
    expect(readCart(), 'Одна позиция — тостер').toEqual([{ id: 3, title: 'Тостер Tefal', price: 2190 }]);
  });

  it('sessionStorage не используется', () => {
    expect(sessionStorage.length, 'sessionStorage пуст').toBe(0);
  });
});
