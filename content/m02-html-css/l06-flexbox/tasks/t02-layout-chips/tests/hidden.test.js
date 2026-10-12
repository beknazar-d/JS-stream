const chips = () => $$('.chips li').map((_, i) => box(`.chips li:nth-child(${i + 1})`));
const rows = () => {
  const map = new Map();
  for (const c of chips()) {
    if (!map.has(c.top)) map.set(c.top, []);
    map.get(c.top).push(c);
  }
  return [...map.values()];
};

describe('Граничные случаи', () => {
  it('каждая строка начинается у левого края контейнера', () => {
    const left = box('.chips').left;
    for (const row of rows()) expect(row[0].left, 'Первая плитка строки у левого края').toBeLessThanOrEqual(left + 1);
  });

  it('плитки одной высоты, текст не переносится внутри плитки', () => {
    const heights = new Set(chips().map((c) => c.height));
    expect(heights.size, 'Все плитки одной высоты (текст в одну строку)').toBe(1);
  });

  it('добавленная плитка не ломает строку и промежутки', () => {
    const li = document.createElement('li');
    li.innerHTML = '<a href="#grill">Грили</a>';
    $('.chips').appendChild(li);
    try {
      const last = box('.chips li:last-child');
      expect(last.right, 'Новая плитка внутри контейнера').toBeLessThanOrEqual(box('.chips').right + 1);
    } finally {
      li.remove();
    }
  });
});
