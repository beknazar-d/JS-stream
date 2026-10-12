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

describe('Панель инструментов', () => {
  it('логотип, поиск и корзина стоят в одной линии', () => {
    const cy = (s) => { const b = box(s); return b.top + b.height / 2; };
    expect(box('.logo').right, 'Поиск правее логотипа').toBeLessThanOrEqual(box('.search').left);
    expect(box('.search').right, 'Корзина правее поиска').toBeLessThanOrEqual(box('.cart').left);
    expect(Math.abs(cy('.logo') - cy('.search')), 'Центры логотипа и поиска').toBeLessThanOrEqual(2);
    expect(Math.abs(cy('.cart') - cy('.search')), 'Центры корзины и поиска').toBeLessThanOrEqual(2);
  });

  it('поиск занимает всё свободное место, корзина у правого края', () => {
    expect(box('.search').width, 'Поле поиска широкое').toBeGreaterThan(400);
    expect(box('.cart').right, 'Корзина у правого края колонки 960px (окно 1024px)').toBeGreaterThanOrEqual(990);
    expect(box('.cart').right, 'Корзина у правого края колонки 960px (окно 1024px)').toBeLessThanOrEqual(994);
  });
});

describe('Каталог', () => {
  it('шесть карточек: четыре в первом ряду и две во втором', () => {
    const rows = byRow();
    expect(rows.map((r) => r.length), 'Число карточек по рядам').toEqual([4, 2]);
  });

  it('все карточки одной ширины 228px', () => {
    for (const c of cards()) expect(Math.abs(c.width - 228), 'Ширина карточки').toBeLessThanOrEqual(2);
  });

  it('промежутки по 16px и в ряду, и между рядами', () => {
    const [a, b] = byRow();
    expect(Math.abs(a[1].left - a[0].right - 16), 'Промежуток в ряду').toBeLessThanOrEqual(2);
    expect(Math.abs(b[0].top - Math.max(...a.map((c) => c.bottom)) - 16), 'Промежуток между рядами').toBeLessThanOrEqual(2);
  });

  it('второй ряд начинается у левого края', () => {
    const [a, b] = byRow();
    expect(b[0].left, 'Первая карточка второго ряда стоит под первой карточкой первого ряда').toBe(a[0].left);
  });
});
