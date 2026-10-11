const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 2})`));

describe('Не привязано к числу колонок', () => {
  it('если колонок станет три, баннер всё равно на всю ширину', () => {
    const grid = $('.catalog');
    const old = grid.style.gridTemplateColumns;
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    try {
      expect(Math.abs(box('.promo').right - box('.catalog').right), 'Баннер до правого края при трёх колонках').toBeLessThanOrEqual(2);
      expect(Math.abs(box('.promo').width - box('.catalog').width), 'Ширина баннера равна ширине сетки').toBeLessThanOrEqual(2);
      expect(css('.catalog', 'grid-template-columns').split(' '), 'В сетке из трёх колонок не появилась лишняя неявная колонка').toHaveLength(3);
      expect(box('.card:nth-child(2)').top, 'Первая карточка по-прежнему под баннером').toBeGreaterThanOrEqual(box('.promo').bottom);
    } finally {
      grid.style.gridTemplateColumns = old;
    }
  });

  it('сетка не получила лишних колонок', () => {
    expect(css('.catalog', 'grid-template-columns').split(' '), 'Четыре колонки, как в макете').toHaveLength(4);
  });
});
