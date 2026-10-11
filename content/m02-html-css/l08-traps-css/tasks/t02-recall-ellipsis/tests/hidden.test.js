const title = (n) => `.order:nth-child(${n}) .order-title`;

describe('Рецепт обрезания устойчив', () => {
  it('длинное название действительно обрезано, а не выпущено наружу', () => {
    const el = $(title(1));
    expect(css(el, 'overflow-x'), 'Содержимое за краем скрыто').toBe('hidden');
    expect(el.scrollWidth, 'Текст шире блока, значит обрезание сработало').toBeGreaterThan(el.clientWidth);
    expect(css(el, 'white-space'), 'Перенос строк запрещён').toBe('nowrap');
  });

  it('короткое название остаётся целым и без обрезания', () => {
    const el = $(title(2));
    expect(el.scrollWidth, 'Короткое название помещается').toBeLessThanOrEqual(el.clientWidth);
    expect(box(title(2)).height, 'Короткое название — одна строка').toBeLessThan(30);
  });

  it('карточки одной ширины, цена на месте', () => {
    expect(box('.order:nth-child(1)').width, 'Ширина карточки').toBe(280);
    expect(box('.order:nth-child(1) .sum').top, 'Цена ниже названия').toBeGreaterThanOrEqual(box(title(1)).bottom);
  });

  it('новое длинное название тоже обрезается', () => {
    const p = $(title(2));
    p.textContent = 'Стиральная машина Bosch WAN-24 с сушкой и функцией пара, загрузка 8 килограммов';
    try {
      expect(box(title(2)).height, 'Одна строка').toBeLessThan(30);
      expect(p.scrollWidth, 'Обрезано').toBeGreaterThan(p.clientWidth);
    } finally {
      p.textContent = 'Чайник K-200';
    }
  });
});
