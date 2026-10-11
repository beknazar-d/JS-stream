const near = (a, b, d = 2) => Math.abs(a - b) <= d;
function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const rgbOf = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const WHITE = [255, 255, 255];
const fg = (el) => rgbOf(css(el, 'color'));
const bg = (el) => rgbOf(css(el, 'background-color'));

describe('новые требования', () => {
  it('карточка «Нет в наличии» выделена', () => {
    expect(css('.kpi--warning', 'border-left-width'), 'Рамка слева').toBe('4px');
    expect(css('.kpi--warning', 'border-left-color'), 'Цвет рамки слева').toBe('rgb(194, 65, 12)');
    expect(css('[data-kpi]', 'border-left-width'), 'У остальных карточек рамка 1px').toBe('1px');
  });

  it('статус «Ждёт поставки» окрашен и контрастен', () => {
    const el = $('.status--backorder');
    expect(css(el, 'background-color'), 'Фон статуса «Ждёт поставки»').not.toBe('rgba(0, 0, 0, 0)');
    const r = ratio(fg(el), bg(el));
    expect(r >= 4.5, `«Ждёт поставки»: ${r.toFixed(2)} к 1`).toBe(true);
  });
});

describe('контраст', () => {
  it('все статусы', () => {
    for (const el of $$('.status')) {
      const r = ratio(fg(el), bg(el));
      expect(r >= 4.5, `Статус «${el.textContent.trim()}»: ${r.toFixed(2)} к 1`).toBe(true);
    }
  });

  it('подписи сводки и текст пейджера', () => {
    expect(ratio(fg('.kpi__label'), WHITE) >= 4.5, 'Подпись сводки').toBe(true);
    expect(ratio(fg('.pager__info'), WHITE) >= 4.5, 'Текст пейджера').toBe(true);
  });

  it('кнопки и рамки', () => {
    const next = $$('.pager__button')[1];
    expect(ratio(fg(next), bg(next)) >= 4.5, 'Кнопка «Вперёд»').toBe(true);
    expect(ratio(fg('.toolbar__reset'), bg('.toolbar__reset')) >= 4.5, 'Кнопка «Сбросить»').toBe(true);
    for (const sel of ['#q', '#status']) {
      expect(ratio(rgbOf(css(sel, 'border-top-color')), WHITE) >= 3, `Рамка поля ${sel} не менее 3 к 1`).toBe(true);
    }
  });
});

describe('видимый фокус', () => {
  for (const sel of ['#q', '#status', '.toolbar__reset', '.pager__button:not(:disabled)', '[data-scroll]']) {
    it(sel, () => {
      const el = $(sel);
      el.focus();
      const s = getComputedStyle(el);
      expect(el.matches(':focus-visible'), 'Фокус считается видимым').toBe(true);
      expect(s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2, `${sel}: нужна рамка outline от 2px`).toBe(true);
      const r = ratio(rgbOf(s.outlineColor), WHITE);
      expect(r >= 3, `${sel}: контраст рамки ${r.toFixed(2)} к 1`).toBe(true);
      el.blur();
    });
  }
});

describe('768', () => {
  it('сводка в ряд, ничего не выходит за окно', async () => {
    await viewport(768);
    const k = $$('[data-kpi]').map((c) => box(c));
    expect(k[0].top === k[2].top, 'Три карточки в ряд на 768').toBe(true);
    expect(near(box('.page').width, 736), `Ширина страницы ${box('.page').width}`).toBe(true);
    expect(document.documentElement.scrollWidth <= 769, 'Нет горизонтальной прокрутки на 768').toBe(true);
    await viewport(1024);
  });
});

describe('375 и граница 600', () => {
  it('сводка столбиком с зазором 12', async () => {
    await viewport(375);
    const k = $$('[data-kpi]').map((c) => box(c));
    expect(near(box('.page').left, 16) && near(box('.page').width, 343), 'Страница 343 с полями 16').toBe(true);
    for (const c of k) expect(near(c.width, 343), `Карточка шириной ${c.width}, ждали 343`).toBe(true);
    expect(near(k[1].top - k[0].bottom, 12) && near(k[2].top - k[1].bottom, 12), 'Зазор между карточками 12').toBe(true);
    await viewport(1024);
  });

  it('фильтры друг под другом на всю ширину', async () => {
    await viewport(375);
    const q = box('#q');
    const s = box('#status');
    const r = box('.toolbar__reset');
    expect(s.top >= q.bottom && r.top >= s.bottom, 'Элементы в столбик').toBe(true);
    for (const b of [q, s, r]) expect(near(b.width, 343), `Ширина элемента ${b.width}, ждали 343`).toBe(true);
    expect(near(q.height, 44) && near(s.height, 44) && near(r.height, 44), 'Высота 44').toBe(true);
    await viewport(1024);
  });

  it('таблица прокручивается внутри контейнера', async () => {
    await viewport(375);
    const w = $('[data-scroll]');
    expect(w.scrollWidth > w.clientWidth + 10, `scrollWidth=${w.scrollWidth}, clientWidth=${w.clientWidth}`).toBe(true);
    expect(document.documentElement.scrollWidth <= 376, 'Страница не прокручивается по горизонтали').toBe(true);
    expect(box('[data-table]').width >= 640, 'Таблица не уже 640').toBe(true);
    await viewport(1024);
  });

  it('пейджер остаётся в одну строку', async () => {
    await viewport(375);
    const [back, next] = $$('.pager__button').map((b) => box(b));
    const info = box('.pager__info');
    expect(near(back.top, next.top, 3) && near(info.top + info.height / 2, back.top + back.height / 2, 8), 'Элементы пейджера в одной строке').toBe(true);
    expect(next.right <= 375 && back.left >= 0, 'Всё в пределах окна').toBe(true);
    await viewport(1024);
  });

  it('599 столбиком, 600 рядом', async () => {
    await viewport(599);
    let k = $$('[data-kpi]').map((c) => box(c));
    expect(k[1].top > k[0].top, 'На 599 карточки друг под другом').toBe(true);
    await viewport(600);
    k = $$('[data-kpi]').map((c) => box(c));
    expect(k[0].top === k[1].top && k[1].top === k[2].top, 'На 600 карточки в ряд').toBe(true);
    await viewport(1024);
  });
});

describe('чистота', () => {
  it('нет !important и style', () => {
    expect(/!\s*important/.test($('style[data-file="styles.css"]').textContent), 'Нужно убрать !important').toBe(false);
    expect($$('[style]').length, 'Атрибутов style').toBe(0);
  });
});
