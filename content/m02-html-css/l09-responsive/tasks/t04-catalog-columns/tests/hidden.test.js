const items = () => $$('.catalog__item').map((_, i) => box(`.catalog__item:nth-child(${i + 1})`));
const near = (a, b) => Math.abs(a - b) <= 2;

describe('Границы контрольных точек', () => {
  it('на 767px ещё одна колонка', async () => {
    await viewport(767);
    const cards = items();
    expect(cards[1].top, 'На 767px вторая карточка стоит под первой').toBeGreaterThan(cards[0].bottom - 1);
    await viewport(1024);
  });

  it('на 1023px две колонки, а не четыре', async () => {
    await viewport(1023);
    const cards = items();
    expect(cards[1].top, 'На 1023px вторая карточка в одном ряду с первой').toBe(cards[0].top);
    expect(cards[2].top, 'На 1023px третья карточка уже на новой строке').toBeGreaterThan(cards[0].bottom - 1);
    await viewport(1024);
  });
});

describe('Отступы и ширина', () => {
  it('на телефоне между карточками 16px по вертикали', async () => {
    await viewport(375);
    const cards = items();
    expect(near(cards[1].top - cards[0].bottom, 16), 'Зазор между карточками на 375px должен быть 16px').toBe(true);
    await viewport(1024);
  });

  it('на компьютере зазор 16px, а ряд заполняет ширину до отступа 16px', () => {
    const cards = items();
    expect(near(cards[1].left - cards[0].right, 16), 'Зазор между соседними карточками на 1024px').toBe(true);
    expect(near(cards[3].right, 1024 - 16), 'Последняя карточка в ряду заканчивается у правого отступа').toBe(true);
    expect(near(cards[0].width, cards[3].width), 'Все карточки в ряду одной ширины').toBe(true);
  });
});
