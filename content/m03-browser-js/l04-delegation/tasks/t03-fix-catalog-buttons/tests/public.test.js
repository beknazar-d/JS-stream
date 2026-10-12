const label = () => $('#cart-count').textContent.trim();

describe('Счётчик корзины', () => {
  it('клик по кнопке увеличивает счётчик', async () => {
    await click('.card:nth-child(1) .add');
    expect(label(), 'После клика по кнопке').toBe('В корзине: 1');
  });

  it('клик по значку внутри кнопки тоже увеличивает', async () => {
    await click('.card:nth-child(2) .add__icon');
    expect(label(), 'После клика по значку').toBe('В корзине: 2');
  });

  it('клик по названию товара ничего не меняет', async () => {
    await click('.card:nth-child(1) .card__title');
    expect(label(), 'После клика по названию').toBe('В корзине: 2');
  });
});
