const items = () => $$('.catalog__item').map((_, i) => box(`.catalog__item:nth-child(${i + 1})`));
const noSideScroll = (width) => expect(document.documentElement.scrollWidth, `При ширине ${width}px страница не должна прокручиваться вбок`).toBeLessThanOrEqual(width);

describe('Каталог на телефоне (375px)', () => {
  it('товары идут в одну колонку на всю ширину', async () => {
    await viewport(375);
    const cards = items();
    expect(cards, 'В каталоге шесть товаров').toHaveLength(6);
    for (const card of cards) {
      expect(card.left, 'Левый край карточки: отступ 16px от края экрана').toBeGreaterThanOrEqual(14);
      expect(card.left, 'Левый край карточки: отступ 16px от края экрана').toBeLessThanOrEqual(18);
      expect(card.width, 'Ширина карточки: экран 375px минус отступы по 16px').toBeGreaterThanOrEqual(341);
      expect(card.width, 'Ширина карточки: экран 375px минус отступы по 16px').toBeLessThanOrEqual(345);
    }
    expect(cards[1].top, 'Вторая карточка стоит под первой').toBeGreaterThan(cards[0].bottom - 1);
    noSideScroll(375);
    await viewport(1024);
  });
});

describe('Каталог на планшете (768px)', () => {
  it('две карточки в ряду, третья — на следующей строке', async () => {
    await viewport(768);
    const cards = items();
    expect(cards[1].top, 'Первая и вторая карточки в одном ряду').toBe(cards[0].top);
    expect(cards[1].left, 'Вторая карточка правее первой').toBeGreaterThan(cards[0].right - 1);
    expect(cards[2].top, 'Третья карточка начинает новый ряд').toBeGreaterThan(cards[0].bottom - 1);
    expect(cards[2].left, 'Третья карточка под первой').toBe(cards[0].left);
    noSideScroll(768);
    await viewport(1024);
  });
});

describe('Каталог на компьютере (1024px)', () => {
  it('четыре карточки в ряду, пятая — на следующей строке', () => {
    const cards = items();
    for (const i of [1, 2, 3]) {
      expect(cards[i].top, `Карточка ${i + 1} в одном ряду с первой`).toBe(cards[0].top);
    }
    expect(cards[3].left, 'Четвёртая карточка правее третьей').toBeGreaterThan(cards[2].right - 1);
    expect(cards[4].top, 'Пятая карточка начинает новый ряд').toBeGreaterThan(cards[0].bottom - 1);
    noSideScroll(1024);
  });
});
