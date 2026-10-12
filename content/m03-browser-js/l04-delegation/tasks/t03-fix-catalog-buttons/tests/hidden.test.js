const num = () => Number($('#cart-count').textContent.replace(/\D/g, ''));

describe('Новые карточки', () => {
  it('карточка из «Показать ещё» работает', async () => {
    await click('#more');
    expect($$('.card'), 'Появилась третья карточка').toHaveLength(3);
    const before = num();
    await click('.card:nth-child(3) .add');
    expect(num() - before, 'Клик по кнопке новой карточки').toBe(1);
  });

  it('значок новой карточки тоже работает', async () => {
    const before = num();
    await click('.card:nth-child(3) .add__icon');
    expect(num() - before, 'Клик по значку новой карточки').toBe(1);
  });

  it('addProduct, вызванная напрямую, даёт рабочую кнопку', async () => {
    addProduct({ id: 'f9', title: 'Фен F-9' });
    const before = num();
    await click('.card:last-child .add');
    expect(num() - before, 'Клик по кнопке карточки от addProduct').toBe(1);
  });
});

describe('Клики мимо кнопок', () => {
  it('пустое место каталога не считается', async () => {
    const before = num();
    await click('#catalog');
    expect(num(), 'Клик по списку каталога').toBe(before);
  });

  it('название новой карточки не считается', async () => {
    const before = num();
    await click('.card:last-child .card__title');
    expect(num(), 'Клик по названию').toBe(before);
  });

  it('счётчик растёт ровно на 1 за клик', async () => {
    const before = num();
    await click('.card:nth-child(1) .add__icon');
    await click('.card:nth-child(1) .add');
    expect(num() - before, 'Два клика — две штуки').toBe(2);
  });
});
