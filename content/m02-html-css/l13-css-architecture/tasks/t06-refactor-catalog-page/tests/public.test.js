// Внешний вид. Эти проверки проходят до рефакторинга и должны проходить после него.
const near = (a, b, d = 2) => Math.abs(a - b) <= d;

function layoutAt(width, columns) {
  const cards = $$('[data-card]').map((c) => box(c));
  const lefts = [...new Set(cards.map((c) => c.left))];
  expect(lefts.length, `На ${width}px колонок ${lefts.length}, ждали ${columns}`).toBe(columns);
  const cardWidth = (width - 48 - 16 * (columns - 1)) / columns;
  expect(near(cards[0].width, cardWidth), `На ${width}px ширина карточки ${cards[0].width}, ждали ${Math.round(cardWidth)}`).toBe(true);
}

describe('внешний вид: четыре колонки на 1024', () => {
  it('сетка', () => layoutAt(1024, 4));

  it('шапка', () => {
    expect(box('[data-header]').height, 'Высота шапки').toBe(64);
    expect(css('[data-header]', 'background-color'), 'Фон шапки').toBe('rgb(11, 61, 145)');
    expect(css('[data-logo]', 'font-size'), 'Размер логотипа').toBe('22px');
    expect(box('[data-logo]').left, 'Логотип отстоит от края на 24px').toBe(24);
  });

  it('ссылки меню', () => {
    const links = $$('[data-nav-link]').map((l) => box(l));
    expect(near(links[1].left - links[0].right, 16), `Зазор между ссылками ${links[1].left - links[0].right}px`).toBe(true);
    expect(css($$('[data-nav-link]')[0], 'border-bottom-color'), 'Подчёркивание активной ссылки').toBe('rgb(255, 210, 63)');
    expect(css($$('[data-nav-link]')[1], 'border-bottom-color'), 'У неактивной подчёркивания нет').toBe('rgba(0, 0, 0, 0)');
  });

  it('заголовок, примечание и подвал', () => {
    expect(css('[data-page-title]', 'font-size'), 'Размер заголовка').toBe('28px');
    expect(css('[data-note]', 'margin-top'), 'Отступ примечания').toBe('24px');
    expect(css('[data-note]', 'color'), 'Цвет примечания').toBe('rgb(107, 114, 128)');
    expect(css('[data-footer]', 'margin-top'), 'Отступ подвала').toBe('32px');
    expect(css('[data-footer]', 'background-color'), 'Фон подвала').toBe('rgb(243, 244, 246)');
    expect(css('[data-footer]', 'font-size'), 'Размер текста подвала').toBe('14px');
  });
});

describe('внешний вид: карточки', () => {
  it('обычная и со скидкой', () => {
    const [plain, sale] = $$('[data-card]');
    expect(css(plain, 'border-top-color'), 'Рамка обычной').toBe('rgb(208, 215, 222)');
    expect(css(sale, 'border-top-color'), 'Рамка со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(sale.querySelector('[data-title]'), 'color'), 'Название со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(sale.querySelector('[data-button]'), 'background-color'), 'Кнопка со скидкой').toBe('rgb(194, 65, 12)');
    expect(css(plain.querySelector('[data-button]'), 'background-color'), 'Кнопка обычной').toBe('rgb(11, 61, 145)');
    expect(css(plain.querySelector('[data-title]'), 'color'), 'Название обычной').toBe('rgb(26, 26, 26)');
  });

  it('цены', () => {
    expect(css('[data-price]', 'font-size'), 'Размер цены').toBe('20px');
    expect(css('[data-old-price]', 'text-decoration-line'), 'Старая цена зачёркнута').toBe('line-through');
    expect(css('[data-old-price]', 'font-size'), 'Размер старой цены').toBe('14px');
    expect(css('[data-image]', 'height'), 'Высота картинки').toBe('100px');
  });
});

describe('внешний вид: адаптив', () => {
  it('две колонки на 600', async () => {
    await viewport(600);
    layoutAt(600, 2);
    await viewport(1024);
  });

  it('одна колонка на 375, шапка сжата', async () => {
    await viewport(375);
    layoutAt(375, 1);
    expect(box('[data-logo]').left, 'Логотип отстоит от края на 12px').toBe(12);
    const links = $$('[data-nav-link]').map((l) => box(l));
    expect(near(links[1].left - links[0].right, 8), `Зазор между ссылками на 375: ${links[1].left - links[0].right}px`).toBe(true);
    expect(document.documentElement.scrollWidth <= 376, 'Горизонтальной прокрутки нет').toBe(true);
    await viewport(1024);
  });
});
