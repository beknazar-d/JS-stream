const label = () => $('#cart-count').textContent.trim();

describe('Состояние после очистки', () => {
  it('после очистки счёт идёт заново с единицы', async () => {
    await click('#clear-btn');
    await click('#add-btn');
    await click('#add-btn');
    await click('#clear-btn');
    await click('#add-btn');
    expect(label(), 'Первый клик после очистки').toBe('Корзина: 1');
  });

  it('очистка пустой корзины ничего не ломает', async () => {
    await click('#clear-btn');
    await click('#clear-btn');
    expect(label(), 'Две очистки подряд').toBe('Корзина: 0');
  });

  it('десять кликов подряд', async () => {
    await click('#clear-btn');
    for (let i = 0; i < 10; i += 1) await click('#add-btn');
    expect(label(), 'Десять кликов').toBe('Корзина: 10');
  });
});
