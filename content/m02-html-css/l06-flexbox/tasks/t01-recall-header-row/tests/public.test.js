const cy = (sel) => { const b = box(sel); return b.top + b.height / 2; };

describe('Шапка в одну линию', () => {
  it('логотип, меню и корзина стоят слева направо', () => {
    expect(box('.logo').right, 'Меню правее логотипа').toBeLessThanOrEqual(box('.nav').left);
    expect(box('.nav').right, 'Корзина правее меню').toBeLessThanOrEqual(box('.cart').left);
  });

  it('логотип прижат влево, корзина вправо', () => {
    expect(box('.logo').left, 'Логотип у левого края с отступом 24px').toBeGreaterThanOrEqual(22);
    expect(box('.logo').left, 'Логотип у левого края с отступом 24px').toBeLessThanOrEqual(26);
    expect(box('.cart').right, 'Корзина у правого края окна 1024px с отступом 24px').toBeGreaterThanOrEqual(998);
    expect(box('.cart').right, 'Корзина у правого края окна 1024px с отступом 24px').toBeLessThanOrEqual(1002);
  });

  it('всё выровнено по центру по вертикали', () => {
    expect(Math.abs(cy('.logo') - cy('.cart')), 'Центры логотипа и корзины совпадают').toBeLessThanOrEqual(2);
    expect(Math.abs(cy('.logo') - cy('.nav')), 'Центры логотипа и меню совпадают').toBeLessThanOrEqual(2);
  });

  it('пункты меню разделены промежутком 24px', () => {
    const items = $$('.nav li').map((li, i) => box(`.nav li:nth-child(${i + 1})`));
    expect(items[1].left - items[0].right, 'Промежуток между «Каталог» и «Доставка»').toBeGreaterThanOrEqual(22);
    expect(items[1].left - items[0].right, 'Промежуток между «Каталог» и «Доставка»').toBeLessThanOrEqual(26);
  });
});
