const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const btns = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1}) .btn`));
const byRow = () => {
  const map = new Map();
  cards().forEach((c, i) => {
    if (!map.has(c.top)) map.set(c.top, []);
    map.get(c.top).push({ ...c, i });
  });
  return [...map.values()];
};

describe('Граничные случаи', () => {
  it('кнопки лежат на одной линии внизу карточек своего ряда', () => {
    const b = btns();
    for (const row of byRow()) {
      const bottoms = row.map((c) => b[c.i].bottom);
      expect(bottoms.every((x) => Math.abs(x - bottoms[0]) <= 1), 'Нижние края кнопок ряда совпадают').toBe(true);
      expect(Math.abs(bottoms[0] - (row[0].bottom - 17)), 'Кнопка у нижнего края карточки').toBeLessThanOrEqual(2);
    }
  });

  it('корзина не сжимается и текст в ней в одну строку', () => {
    expect(box('.cart').height, 'Корзина в одну строку').toBeLessThanOrEqual(44);
  });

  it('длинный текст в поиске или логотипе не ломает ряд', () => {
    $('.logo').textContent = 'Домотека — всё для дома и кухни';
    try {
      expect(box('.cart').height, 'Корзина осталась в одну строку').toBeLessThanOrEqual(44);
      expect(box('.cart').right, 'Корзина осталась у правого края').toBeGreaterThanOrEqual(990);
    } finally {
      $('.logo').textContent = 'Домотека';
    }
  });

  it('если товаров четыре, ширина карточек остаётся 228px', () => {
    const removed = [$('.card:nth-child(6)'), $('.card:nth-child(5)')];
    const parent = $('.cards');
    removed.forEach((el) => el.remove());
    try {
      const c = cards();
      expect(c, 'Осталось четыре карточки').toHaveLength(4);
      for (const x of c) expect(Math.abs(x.width - 228), 'Ширина карточки не зависит от их числа').toBeLessThanOrEqual(2);
    } finally {
      removed.reverse().forEach((el) => parent.appendChild(el));
    }
  });

  it('седьмая карточка встаёт во второй ряд той же ширины', () => {
    const copy = $('.card:nth-child(1)').cloneNode(true);
    $('.cards').appendChild(copy);
    try {
      const rows = byRow();
      expect(rows.map((r) => r.length), 'Число карточек по рядам').toEqual([4, 3]);
      expect(Math.abs(box('.card:nth-child(7)').width - 228), 'Ширина новой карточки').toBeLessThanOrEqual(2);
    } finally {
      copy.remove();
    }
  });
});
