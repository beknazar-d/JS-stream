const chips = () => $$('.chips li').map((_, i) => box(`.chips li:nth-child(${i + 1})`));
const rows = () => {
  const map = new Map();
  for (const c of chips()) {
    if (!map.has(c.top)) map.set(c.top, []);
    map.get(c.top).push(c);
  }
  return [...map.values()];
};

describe('Плитки категорий', () => {
  it('плитки переносятся на несколько строк внутри контейнера', () => {
    const right = box('.chips').right;
    expect(rows().length, 'Плиток восемь, в 480px они не помещаются в одну строку').toBeGreaterThanOrEqual(2);
    for (const c of chips()) expect(c.right, 'Плитка не выходит за правый край контейнера').toBeLessThanOrEqual(right + 1);
  });

  it('горизонтальный промежуток 12px', () => {
    const first = rows()[0];
    expect(first.length, 'В первой строке не меньше двух плиток').toBeGreaterThanOrEqual(2);
    expect(first[1].left - first[0].right, 'Промежуток между плитками в строке').toBeGreaterThanOrEqual(10);
    expect(first[1].left - first[0].right, 'Промежуток между плитками в строке').toBeLessThanOrEqual(14);
  });

  it('вертикальный промежуток между строками 8px', () => {
    const [a, b] = rows();
    const gap = b[0].top - Math.max(...a.map((c) => c.bottom));
    expect(gap, 'Промежуток между строками плиток').toBeGreaterThanOrEqual(6);
    expect(gap, 'Промежуток между строками плиток').toBeLessThanOrEqual(10);
  });
});
