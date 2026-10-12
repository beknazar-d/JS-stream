const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('раскладка на 1024', () => {
  it('карточка шириной 960 по центру', () => {
    const b = box('.product');
    expect(near(b.width, 960), `Ширина карточки ${b.width}, ждали 960`).toBe(true);
    expect(near(b.left, 32), `Отступ слева ${b.left}, ждали 32`).toBe(true);
  });

  it('две колонки: галерея 480, зазор 32', () => {
    const gallery = box('.product__gallery');
    const info = box('.product__info');
    expect(near(gallery.width, 480), `Ширина галереи ${gallery.width}, ждали 480`).toBe(true);
    expect(near(info.left - gallery.right, 32), `Зазор между колонками ${info.left - gallery.right}, ждали 32`).toBe(true);
    expect(near(info.top, gallery.top, 2), 'Колонки начинаются на одной высоте').toBe(true);
  });

  it('основная картинка 480 на 360', () => {
    const b = box('.product__image');
    expect(near(b.width, 480) && near(b.height, 360), `Картинка ${b.width} на ${b.height}, ждали 480 на 360`).toBe(true);
  });

  it('три миниатюры 96 на 72 с зазором 12', () => {
    const thumbs = $$('.product__thumb').map((t) => box(t));
    expect(thumbs, 'Миниатюр').toHaveLength(3);
    for (const t of thumbs) expect(near(t.width, 96) && near(t.height, 72), `Миниатюра ${t.width} на ${t.height}`).toBe(true);
    expect(thumbs[0].top === thumbs[1].top && thumbs[1].top === thumbs[2].top, 'Миниатюры в одном ряду').toBe(true);
    expect(near(thumbs[1].left - thumbs[0].right, 12) && near(thumbs[2].left - thumbs[1].right, 12), 'Зазор между миниатюрами 12').toBe(true);
    expect(near(thumbs[0].top - box('.product__image').bottom, 12), 'Зазор между картинкой и миниатюрами 12').toBe(true);
  });
});

describe('текст, кнопка, характеристики', () => {
  it('размеры шрифтов', () => {
    expect(css('.product__title', 'font-size'), 'Заголовок').toBe('32px');
    expect(css('.product__price', 'font-size'), 'Цена').toBe('28px');
    expect(Number(css('.product__price', 'font-weight')) >= 600, 'Цена жирная').toBe(true);
    expect(css('.product__old-price', 'font-size'), 'Старая цена').toBe('18px');
    expect(css('.product__old-price', 'text-decoration-line'), 'Старая цена зачёркнута').toBe('line-through');
  });

  it('верх заголовка на одной линии с картинкой', () => {
    const t = box('.product__title');
    const i = box('.product__image');
    expect(t.top >= i.top - 2 && t.top <= i.top + 8, `Верх заголовка ${t.top}, верх картинки ${i.top}`).toBe(true);
  });

  it('кнопка 200 на 48', () => {
    const b = box('.product__buy');
    expect(near(b.width, 200) && near(b.height, 48), `Кнопка ${b.width} на ${b.height}, ждали 200 на 48`).toBe(true);
  });

  it('характеристики в две колонки', () => {
    const terms = $$('.product__specs-term').map((t) => box(t));
    const values = $$('.product__specs-value').map((v) => box(v));
    expect(terms, 'Названий характеристик').toHaveLength(4);
    terms.forEach((t, i) => {
      expect(near(values[i].left - t.left, 160), `Значение №${i + 1} правее названия на ${values[i].left - t.left}, ждали 160`).toBe(true);
      expect(near(values[i].top, t.top, 4), `Название и значение №${i + 1} в одной строке`).toBe(true);
    });
  });
});
