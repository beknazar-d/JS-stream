const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const columns = () => new Set(cards().map((c) => c.left)).size;

describe('Граничные случаи', () => {
  it('карточки не уже 200px и не выходят за экран на узком окне', async () => {
    for (const w of [320, 480, 700, 900]) {
      await viewport(w);
      try {
        for (const c of cards()) {
          expect(c.width, `Окно ${w}px: ширина карточки не меньше 200px`).toBeGreaterThanOrEqual(199);
          expect(c.right, `Окно ${w}px: карточка не выходит за правый край окна`).toBeLessThanOrEqual(w);
        }
      } finally {
        await viewport(1024);
      }
    }
  });

  it('две карточки не растягиваются на всю ширину', () => {
    const removed = [];
    for (let i = 8; i >= 3; i--) removed.push($(`.card:nth-child(${i})`));
    removed.forEach((el) => el.remove());
    try {
      const c = cards();
      expect(c, 'Осталось две карточки').toHaveLength(2);
      expect(c[0].width, 'Карточка сохраняет ширину колонки, не растягивается на пол-экрана').toBeLessThanOrEqual(260);
    } finally {
      removed.reverse().forEach((el) => $('.catalog').appendChild(el));
    }
  });

  it('промежутки по 16px', () => {
    const c = cards();
    expect(Math.abs(c[1].left - c[0].right - 16), 'Промежуток между колонками').toBeLessThanOrEqual(2);
    expect(Math.abs(c[4].top - c[0].bottom - 16), 'Промежуток между рядами').toBeLessThanOrEqual(2);
  });
});
