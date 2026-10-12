describe('Страница панели на сетке', () => {
  it('шапка занимает всю ширину окна сверху', () => {
    const h = box('.app > header');
    expect(h.top, 'Шапка в самом верху').toBeLessThanOrEqual(1);
    expect(h.left, 'Шапка от левого края').toBeLessThanOrEqual(1);
    expect(h.right, 'Шапка до правого края окна 1024px').toBeGreaterThanOrEqual(1023);
  });

  it('меню слева шириной 200px, боковая панель справа шириной 240px', () => {
    const n = box('.app > nav');
    const a = box('.app > aside');
    expect(n.left, 'Меню у левого края').toBeLessThanOrEqual(1);
    expect(Math.abs(n.width - 200), 'Ширина меню').toBeLessThanOrEqual(2);
    expect(a.right, 'Сводка у правого края').toBeGreaterThanOrEqual(1023);
    expect(Math.abs(a.width - 240), 'Ширина сводки').toBeLessThanOrEqual(2);
  });

  it('основная часть между ними с промежутками 16px', () => {
    const n = box('.app > nav');
    const m = box('.app > main');
    const a = box('.app > aside');
    expect(Math.abs(m.left - n.right - 16), 'Промежуток между меню и основной частью').toBeLessThanOrEqual(2);
    expect(Math.abs(a.left - m.right - 16), 'Промежуток между основной частью и сводкой').toBeLessThanOrEqual(2);
  });

  it('три блока среднего ряда стоят в одном ряду, под шапкой с промежутком 16px', () => {
    const h = box('.app > header');
    const n = box('.app > nav');
    expect(Math.abs(n.top - h.bottom - 16), 'Промежуток между шапкой и средним рядом').toBeLessThanOrEqual(2);
    expect(box('.app > main').top, 'Основная часть на одном уровне с меню').toBe(n.top);
    expect(box('.app > aside').top, 'Сводка на одном уровне с меню').toBe(n.top);
  });
});
