const readCart = () => {
  const raw = localStorage.getItem('cart');
  try {
    return JSON.parse(raw);
  } catch {
    expect(false, `В localStorage по ключу cart лежит «${raw}». Это не JSON: массив нужно превратить в строку через JSON.stringify`).toBe(true);
  }
};

describe('Сохранение корзины', () => {
  it('при загрузке показано сохранённое с прошлого визита', () => {
    expect($('#cart-count').textContent, 'В хранилище одна позиция, на странице должно быть 1').toBe('1');
  });

  it('добавленный товар попадает в хранилище вместе с прежними', async () => {
    await click('#products li:nth-child(1) .add');
    expect($('#cart-count').textContent, 'После добавления чайника в корзине 2 товара').toBe('2');
    const cart = readCart();
    expect(cart, 'Корзина в хранилище — массив из двух позиций').toHaveLength(2);
    expect(cart.map((item) => item.id), 'Прежний тостер остался, чайник добавился').toEqual([3, 1]);
  });

  it('позиция хранит числа в id и price', () => {
    const last = readCart().at(-1);
    expect(last, 'Последняя позиция').toEqual({ id: 1, title: 'Чайник Bosch', price: 3490 });
  });
});
