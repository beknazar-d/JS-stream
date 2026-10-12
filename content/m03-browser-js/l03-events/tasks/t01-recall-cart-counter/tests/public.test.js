const label = () => $('#cart-count').textContent.trim();

describe('Счётчик корзины', () => {
  it('сразу после загрузки показывает ноль', () => {
    expect(label(), 'Начальный текст счётчика').toBe('Корзина: 0');
  });

  it('клик по «Добавить» увеличивает счёт на 1', async () => {
    await click('#add-btn');
    expect(label(), 'После первого клика').toBe('Корзина: 1');
    await click('#add-btn');
    await click('#add-btn');
    expect(label(), 'После трёх кликов').toBe('Корзина: 3');
  });

  it('клик по «Очистить» сбрасывает счёт', async () => {
    await click('#add-btn');
    await click('#clear-btn');
    expect(label(), 'После очистки').toBe('Корзина: 0');
  });
});
