const qtyOf = (id) => $(`#cart .cart-row[data-id="${id}"] .cart-row__qty`)?.textContent.trim();
const totalText = () => $('#total').textContent.replace(/\s/g, ' ').trim();

describe('Кнопки в корзине', () => {
  it('«+» увеличивает количество и итог', async () => {
    await click('.cart-row[data-id="k200"] [data-action="inc"]');
    expect(qtyOf('k200'), 'Количество чайников').toBe('2');
    expect(totalText(), 'Итого: 2×2990 + 2×4990').toBe('Итого: 15 960 ₽');
  });

  it('после перерисовки кнопки продолжают работать', async () => {
    await click('.cart-row[data-id="k200"] [data-action="inc"]');
    await click('.cart-row[data-id="k200"] [data-action="inc"]');
    expect(qtyOf('k200'), 'Три клика подряд по «+»').toBe('4');
  });

  it('«−» уменьшает количество', async () => {
    await click('.cart-row[data-id="b50"] [data-action="dec"]');
    expect(qtyOf('b50'), 'Количество блендеров').toBe('1');
  });

  it('«×» удаляет товар', async () => {
    await click('.cart-row[data-id="b50"] [data-action="remove"]');
    expect($('.cart-row[data-id="b50"]'), 'Блендера в корзине нет').toBeNull();
  });
});
