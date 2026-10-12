const qtyOf = (id) => $(`#cart .cart-row[data-id="${id}"] .cart-row__qty`)?.textContent.trim();
const totalText = () => $('#total').textContent.replace(/\s/g, ' ').trim();
const ids = () => $$('#cart .cart-row').map((row) => row.dataset.id);

describe('Границы и значки', () => {
  it('значок внутри кнопки работает как кнопка', async () => {
    await click('#cart .cart-row:first-child [data-action="remove"]');
    addToCart({ id: 'f9', title: 'Фен F-9', price: 1500 });
    const before = Number(qtyOf('f9'));
    await click('.cart-row[data-id="f9"] [data-action="inc"] .icon');
    expect(Number(qtyOf('f9')) - before, 'Клик по значку плюса').toBe(1);
  });

  it('количество не опускается ниже 1', async () => {
    addToCart({ id: 't2', title: 'Тостер T-2', price: 2190 });
    for (let i = 0; i < 4; i += 1) await click('.cart-row[data-id="t2"] [data-action="dec"] .icon');
    expect(qtyOf('t2'), 'После четырёх нажатий на «−» при количестве 1').toBe('1');
  });

  it('количество не поднимается выше 99', async () => {
    for (let i = 0; i < 100; i += 1) addToCart({ id: 't2', title: 'Тостер T-2', price: 2190 });
    expect(qtyOf('t2'), 'После ста добавлений').toBe('99');
    await click('.cart-row[data-id="t2"] [data-action="inc"]');
    expect(qtyOf('t2'), 'Плюс на максимуме').toBe('99');
  });

  it('клик по названию и по свободному месту ничего не меняет', async () => {
    const before = $('#cart').innerHTML;
    await click('#cart .cart-row .cart-row__title');
    await click('#cart');
    expect($('#cart').innerHTML, 'Разметка корзины не изменилась').toBe(before);
  });
});

describe('addToCart и пустая корзина', () => {
  it('новый товар добавляется с количеством 1, повторный увеличивает', async () => {
    while ($$('#cart .cart-row').length > 0) await click('#cart .cart-row [data-action="remove"]');
    addToCart({ id: 'g1', title: 'Гриль G-1', price: 6000 });
    expect(qtyOf('g1'), 'Первое добавление').toBe('1');
    addToCart({ id: 'g1', title: 'Гриль G-1', price: 6000 });
    expect(qtyOf('g1'), 'Второе добавление').toBe('2');
    expect(ids(), 'В корзине одна строка').toEqual(['g1']);
    expect(totalText(), 'Итого').toBe('Итого: 12 000 ₽');
  });

  it('пустая корзина: сообщение показано, итог нулевой', async () => {
    while ($$('#cart .cart-row').length > 0) await click('#cart .cart-row [data-action="remove"]');
    expect($('.empty').hidden, 'Сообщение о пустой корзине показано').toBe(false);
    expect(totalText(), 'Итого').toBe('Итого: 0 ₽');
  });

  it('после добавления сообщение скрыто', () => {
    addToCart({ id: 'k200', title: 'Чайник K-200', price: 2990 });
    expect($('.empty').hidden, 'Сообщение скрыто').toBe(true);
    expect(totalText(), 'Итого').toBe('Итого: 2 990 ₽');
  });
});
