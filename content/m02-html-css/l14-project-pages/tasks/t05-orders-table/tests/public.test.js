// Внешний вид: проходит и до рефакторинга, и после.
const near = (a, b, d = 2) => Math.abs(a - b) <= d;
const left = (el, ref) => box(el).left - box(ref).left;

describe('колонки на 1024', () => {
  it('таблица на ширину страницы', () => {
    expect(near(box('[data-table]').width, 960), `Ширина таблицы ${box('[data-table]').width}, ждали 960`).toBe(true);
  });

  it('заголовки стоят в колонках 110, остаток, 140, 120, 120', () => {
    const cells = $$('[data-head] [data-col]');
    expect(cells, 'Заголовков колонок').toHaveLength(5);
    const lefts = cells.map((c) => left(c, '[data-table]'));
    [0, 110, 580, 720, 840].forEach((expected, i) => {
      expect(near(lefts[i], expected), `Колонка №${i + 1}: left=${lefts[i]}, ждали ${expected}`).toBe(true);
    });
  });

  it('ячейки строк совпадают с колонками заголовка', () => {
    const head = $$('[data-head] [data-col]').map((c) => box(c).left);
    for (const row of $$('[data-row]')) {
      const lefts = [...row.querySelectorAll('[data-col]')].map((c) => box(c).left);
      lefts.forEach((l, i) => expect(near(l, head[i]), `Ячейка колонки №${i + 1} не под заголовком: ${l} вместо ${head[i]}`).toBe(true));
    }
  });
});

describe('размеры и цвета', () => {
  it('высота строк', () => {
    expect(box('[data-head]').height >= 43 && box('[data-head]').height <= 46, `Высота шапки ${box('[data-head]').height}`).toBe(true);
    for (const row of $$('[data-row]')) expect(box(row).height >= 47 && box(row).height <= 51, `Высота строки ${box(row).height}, ждали около 48`).toBe(true);
    expect($$('[data-row]'), 'Строк заказов').toHaveLength(4);
  });

  it('шапка серая и жирная', () => {
    expect(css('[data-head]', 'background-color'), 'Фон шапки').toBe('rgb(243, 244, 246)');
    expect(css('[data-head] [data-col="number"]', 'font-weight'), 'Насыщенность заголовка').toBe('600');
    expect(css('[data-head] [data-col="number"]', 'font-size'), 'Размер заголовка').toBe('14px');
  });

  it('суммы по правому краю', () => {
    const cell = $$('[data-row] [data-col="total"]')[0];
    expect(css(cell, 'text-align'), 'Выравнивание суммы').toBe('right');
    expect(css(cell, 'font-variant-numeric'), 'Цифры одной ширины').toBe('tabular-nums');
    expect(css('[data-head] [data-col="total"]', 'text-align'), 'Заголовок суммы тоже справа').toBe('right');
  });

  it('статусы окрашены', () => {
    expect(css('.status--paid', 'background-color'), 'Фон «Оплачен»').toBe('rgb(220, 252, 231)');
    expect(css('.status--cancelled', 'color'), 'Текст «Отменён»').toBe('rgb(153, 27, 27)');
    expect(css('.status--paid', 'border-top-left-radius').length > 0, 'Скругление статуса').toBe(true);
  });
});
