const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const btns = () => $$('.btn').map((_, i) => box(`.card:nth-child(${i + 1}) .btn`));

describe('Карточки в ряд', () => {
  it('три карточки стоят в один ряд', () => {
    const c = cards();
    expect(c.every((x) => x.top === c[0].top), 'У всех карточек один верхний край').toBe(true);
    expect(c[1].left, 'Вторая правее первой').toBeGreaterThan(c[0].right - 1);
    expect(c[2].left, 'Третья правее второй').toBeGreaterThan(c[1].right - 1);
  });

  it('карточки одинаковой ширины с промежутком 16px', () => {
    const c = cards();
    expect(Math.abs(c[0].width - c[1].width), 'Ширины первой и второй').toBeLessThanOrEqual(2);
    expect(Math.abs(c[1].width - c[2].width), 'Ширины второй и третьей').toBeLessThanOrEqual(2);
    expect(Math.abs(c[1].left - c[0].right - 16), 'Промежуток между первой и второй').toBeLessThanOrEqual(2);
  });

  it('карточки одной высоты', () => {
    const c = cards();
    expect(c.every((x) => Math.abs(x.height - c[0].height) <= 1), 'Высоты всех карточек одинаковы').toBe(true);
  });

  it('кнопки лежат на одной линии внизу карточек', () => {
    const b = btns();
    const c = cards();
    expect(b.every((x) => Math.abs(x.bottom - b[0].bottom) <= 1), 'Нижние края кнопок совпадают').toBe(true);
    expect(Math.abs(b[0].bottom - (c[0].bottom - 17)), 'Кнопка у нижнего края карточки (padding 16 и рамка 1)').toBeLessThanOrEqual(2);
  });
});
