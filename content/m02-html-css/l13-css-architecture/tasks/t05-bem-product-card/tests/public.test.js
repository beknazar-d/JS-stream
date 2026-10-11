// Внешний вид: эти проверки проходят и до рефакторинга, и после него.
const cards = () => $$('[data-card]');

describe('внешний вид: раскладка', () => {
  it('три карточки в одну строку с зазором 16px', () => {
    const b = cards().map((c) => box(c));
    expect(b, 'Карточек в каталоге').toHaveLength(3);
    expect(b[0].top === b[1].top && b[1].top === b[2].top, 'Карточки стоят в одной строке').toBe(true);
    expect(Math.abs(b[1].left - b[0].right - 16) <= 2, `Зазор между первой и второй ${b[1].left - b[0].right}px, ждали 16`).toBe(true);
    expect(Math.abs(b[0].width - 220) <= 2, `Ширина карточки ${b[0].width}px, ждали 220`).toBe(true);
  });

  it('картинка высотой 100px, отступ карточки 16px', () => {
    expect(box('[data-image]').height, 'Высота картинки').toBe(100);
    expect(css('[data-card]', 'padding-left'), 'Внутренний отступ карточки').toBe('16px');
  });
});

describe('внешний вид: текст и кнопки', () => {
  it('название и цена', () => {
    expect(css('[data-title]', 'font-size'), 'Размер названия').toBe('18px');
    expect(css('[data-title]', 'font-weight'), 'Насыщенность названия').toBe('600');
    expect(css('[data-price]', 'font-size'), 'Размер цены').toBe('20px');
    expect(css('[data-price]', 'font-weight'), 'Насыщенность цены').toBe('700');
  });

  it('старая цена зачёркнута и серая', () => {
    expect(css('[data-old-price]', 'text-decoration-line'), 'Старая цена зачёркнута').toBe('line-through');
    expect(css('[data-old-price]', 'color'), 'Цвет старой цены').toBe('rgb(107, 114, 128)');
    expect(css('[data-old-price]', 'font-size'), 'Размер старой цены').toBe('14px');
  });

  it('кнопка синяя, с отступами 8 и 16', () => {
    const button = $('[data-button]');
    expect(css(button, 'background-color'), 'Фон кнопки').toBe('rgb(11, 61, 145)');
    expect(css(button, 'padding-top'), 'Вертикальный отступ кнопки').toBe('8px');
    expect(css(button, 'padding-left'), 'Горизонтальный отступ кнопки').toBe('16px');
    expect(css(button, 'text-decoration-line'), 'Без подчёркивания').toBe('none');
  });

  it('карточка со скидкой выделена', () => {
    const sale = cards()[1];
    expect(css(sale, 'border-top-color'), 'Рамка карточки со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(sale.querySelector('[data-title]'), 'color'), 'Название в карточке со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(sale.querySelector('[data-button]'), 'background-color'), 'Кнопка в карточке со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(cards()[0], 'border-top-color'), 'Рамка обычной карточки').toBe('rgb(208, 215, 222)');
  });
});
