const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('1024: сводка и заголовок', () => {
  it('страница по центру, заголовок 28', () => {
    const p = box('.page');
    expect(near(p.width, 960) && near(p.left, 32), `Страница: width=${p.width}, left=${p.left}, ждали 960 и 32`).toBe(true);
    expect(css('.page__title', 'font-size'), 'Заголовок').toBe('28px');
  });

  it('три равные карточки в ряд с зазором 16', () => {
    const k = $$('[data-kpi]').map((c) => box(c));
    expect(k, 'Карточек сводки').toHaveLength(3);
    expect(k[0].top === k[1].top && k[1].top === k[2].top, 'Карточки в одном ряду').toBe(true);
    expect(near(k[0].width, k[1].width) && near(k[1].width, k[2].width), 'Карточки одной ширины').toBe(true);
    expect(near(k[1].left - k[0].right, 16), `Зазор ${k[1].left - k[0].right}, ждали 16`).toBe(true);
    expect(near(k[0].width, (960 - 32) / 3, 3), `Ширина карточки ${k[0].width}`).toBe(true);
  });

  it('вид карточки', () => {
    expect(css('.kpi__value', 'font-size'), 'Размер числа').toBe('32px');
    expect(css('.kpi__label', 'font-size'), 'Размер подписи').toBe('14px');
    expect(css('[data-kpi]', 'padding-left'), 'Отступ внутри').toBe('16px');
    expect(css('[data-kpi]', 'border-top-width'), 'Рамка').toBe('1px');
  });
});

describe('1024: фильтры и таблица', () => {
  it('фильтры в один ряд, высота 44', () => {
    const q = box('#q');
    const s = box('#status');
    const r = box('.toolbar__reset');
    expect(near(q.height, 44) && near(s.height, 44) && near(r.height, 44), `Высоты: ${q.height}, ${s.height}, ${r.height}`).toBe(true);
    const center = (b) => b.top + b.height / 2;
    expect(near(center(q), center(s), 3) && near(center(s), center(r), 3), 'Центры на одной линии').toBe(true);
    expect(near(s.width, 200), `Список статусов ${s.width}, ждали 200`).toBe(true);
    expect(q.width > 300, `Поиск растянут: ${q.width}`).toBe(true);
  });

  it('колонки таблицы', () => {
    const lefts = $$('[data-head] [data-col]').map((c) => box(c).left - box('[data-table]').left);
    [0, 110, 580, 720, 840].forEach((e, i) => expect(near(lefts[i], e), `Колонка №${i + 1}: ${lefts[i]}, ждали ${e}`).toBe(true));
    expect(css('[data-head]', 'background-color'), 'Фон шапки').toBe('rgb(243, 244, 246)');
    expect(css('[data-row] [data-col="total"]', 'text-align'), 'Суммы справа').toBe('right');
  });
});

describe('пейджер на 1024', () => {
  it('назад слева, страница по центру, вперёд справа', () => {
    const [back, next] = $$('.pager__button').map((b) => box(b));
    const info = box('.pager__info');
    const pager = box('.pager');
    expect(near(back.left, pager.left) && near(next.right, pager.right), 'Кнопки по краям пейджера').toBe(true);
    expect(near(info.left + info.width / 2, pager.left + pager.width / 2, 20), 'Текст по центру').toBe(true);
    expect(back.height >= 44 && next.height >= 44, 'Кнопки не ниже 44').toBe(true);
  });
});
