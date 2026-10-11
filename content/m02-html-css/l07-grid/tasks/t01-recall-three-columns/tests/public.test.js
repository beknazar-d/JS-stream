const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const rows = () => {
  const m = new Map();
  for (const c of cards()) { if (!m.has(c.top)) m.set(c.top, []); m.get(c.top).push(c); }
  return [...m.values()];
};

describe('Каталог в три колонки', () => {
  it('шесть карточек лежат в два ряда по три', () => {
    expect(rows().map((r) => r.length), 'Число карточек по рядам').toEqual([3, 3]);
  });

  it('колонки одной ширины, правая граница сетки совпадает с краем колонки 960px', () => {
    const [first] = rows();
    expect(Math.abs(first[0].width - first[1].width), 'Ширины колонок одинаковы').toBeLessThanOrEqual(2);
    expect(Math.abs(first[1].width - first[2].width), 'Ширины колонок одинаковы').toBeLessThanOrEqual(2);
    expect(Math.abs(first[2].right - box('main').right), 'Последняя колонка у правого края main').toBeLessThanOrEqual(2);
  });

  it('промежутки между карточками 16px', () => {
    const [a, b] = rows();
    expect(Math.abs(a[1].left - a[0].right - 16), 'Промежуток между колонками').toBeLessThanOrEqual(2);
    expect(Math.abs(b[0].top - a[0].bottom - 16), 'Промежуток между рядами').toBeLessThanOrEqual(2);
  });
});
