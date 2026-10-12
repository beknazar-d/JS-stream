const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 2})`));

describe('Баннер акции', () => {
  it('баннер занимает всю ширину сетки', () => {
    const promo = box('.promo');
    const grid = box('.catalog');
    expect(Math.abs(promo.left - grid.left), 'Левый край баннера у левого края сетки').toBeLessThanOrEqual(2);
    expect(Math.abs(promo.right - grid.right), 'Правый край баннера у правого края сетки, сейчас ' + promo.right).toBeLessThanOrEqual(2);
  });

  it('баннер выше карточек', () => {
    expect(box('.promo').bottom, 'Баннер заканчивается раньше, чем начинаются карточки').toBeLessThanOrEqual(box('.card:nth-child(2)').top);
  });

  it('карточки под баннером в четыре колонки', () => {
    const c = cards();
    expect(c[0].top, 'Первые четыре карточки в одном ряду').toBe(c[3].top);
    expect(c[4].top, 'Пятая карточка в новом ряду').toBeGreaterThan(c[0].bottom);
  });
});
