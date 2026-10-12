const near = (a, b) => Math.abs(a - b) <= 2;

describe('Расстояния и кнопка', () => {
  it('расстояния по вертикали', () => {
    const gap1 = box('.title').top - box('.photo').bottom;
    const gap2 = box('.price').top - box('.title').bottom;
    const gap3 = box('.buy').top - box('.price').bottom;
    expect(near(gap1, 12), `Между фото и названием: ${gap1}, ожидалось 12`).toBe(true);
    expect(near(gap2, 4), `Между названием и ценой: ${gap2}, ожидалось 4`).toBe(true);
    expect(near(gap3, 16), `Между ценой и кнопкой: ${gap3}, ожидалось 16`).toBe(true);
  });

  it('кнопка 286 на 40', () => {
    const buy = box('.buy');
    expect(near(buy.width, 286), `Ширина кнопки: ${buy.width}, ожидалось 286`).toBe(true);
    expect(near(buy.height, 40), `Высота кнопки: ${buy.height}, ожидалось 40`).toBe(true);
    expect(near(buy.left - box('.card').left, 17), 'Кнопка начинается на 17px правее края карточки').toBe(true);
  });

  it('низ карточки', () => {
    const gap = box('.card').bottom - box('.buy').bottom;
    expect(near(gap, 17), `Кнопка до низа карточки: ${gap}, ожидалось 17`).toBe(true);
  });

  it('рамка и внутренние отступы', () => {
    expect(css('.card', 'padding-left'), 'padding карточки').toBe('16px');
    expect(css('.card', 'border-left-width'), 'рамка карточки').toBe('1px');
  });
});
