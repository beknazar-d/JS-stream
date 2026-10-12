describe('Клик по значку внутри кнопки', () => {
  it('товар определяется по кнопке, а не по значку', async () => {
    await click('.buy[data-id="b50"] .buy__icon');
    expect($('#last').textContent.trim(), 'Клик по значку блендера').toBe('Последний товар: Блендер B-50');
  });

  it('значок каждой кнопки работает', async () => {
    const before = Number($('#summary').textContent.replace(/\D/g, ''));
    await click('.buy[data-id="k200"] .buy__icon');
    await click('.buy[data-id="t2"] .buy__icon');
    expect(Number($('#summary').textContent.replace(/\D/g, '')) - before, 'Два клика по значкам — две штуки').toBe(2);
    expect($('#last').textContent.trim(), 'Последний — тостер').toBe('Последний товар: Тостер T-2');
  });
});

describe('Промокод применяется один раз', () => {
  it('повторные клики не увеличивают скидку', async () => {
    await click('#promo-btn');
    await click('#promo-btn');
    await click('#promo-btn');
    expect($('#promo-status').textContent.trim(), 'После трёх кликов').toBe('Скидка: 10%');
  });
});
