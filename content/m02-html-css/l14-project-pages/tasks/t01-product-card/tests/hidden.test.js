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

describe('семантика', () => {
  it('main, article и единственный h1', () => {
    expect($('main'), 'Нужен элемент main').not.toBeNull();
    expect($('main article.product'), 'Карточка должна быть элементом article внутри main').not.toBeNull();
    expect($$('h1'), 'На странице один h1').toHaveLength(1);
    expect($('h1').classList.contains('product__title'), 'h1 — это заголовок товара').toBe(true);
  });

  it('кнопка «В корзину» настоящая', () => {
    const b = $('.product__buy');
    expect(b.tagName, 'Кнопка «В корзину» должна быть элементом button').toBe('BUTTON');
    expect(b.getAttribute('type'), 'type кнопки').toBe('button');
    expect(b.textContent.trim(), 'Текст кнопки').toBe('В корзину');
  });

  it('характеристики — список описаний', () => {
    const dl = $('dl.product__specs');
    expect(dl, 'Нужен dl с классом product__specs').not.toBeNull();
    expect(dl.querySelectorAll('dt.product__specs-term'), 'Названий в dt').toHaveLength(4);
    expect(dl.querySelectorAll('dd.product__specs-value'), 'Значений в dd').toHaveLength(4);
  });

  it('у картинок разные непустые alt', () => {
    const alts = $$('img').map((img) => (img.getAttribute('alt') ?? '').trim());
    expect(alts, 'Картинок на странице').toHaveLength(4);
    expect(alts.every((a) => a.length >= 6), `Есть пустой или слишком короткий alt: ${JSON.stringify(alts)}`).toBe(true);
    expect(new Set(alts).size, 'Описания картинок должны различаться').toBe(4);
  });

  it('нет inline-стилей', () => {
    expect($$('[style]').length, 'Атрибутов style').toBe(0);
  });
});

describe('контраст', () => {
  const cases = [
    ['.product__price', 'цена'],
    ['.product__rating', 'рейтинг'],
    ['.product__old-price', 'старая цена'],
    ['.product__specs-term', 'названия характеристик'],
    ['.product__specs-value', 'значения характеристик'],
    ['.product__text', 'описание'],
  ];
  for (const [selector, name] of cases) {
    it(name, () => {
      const r = ratio(rgbOf(css(selector, 'color')), WHITE);
      expect(r >= 4.5, `${name}: контраст ${r.toFixed(2)} к 1, нужно не меньше 4,5`).toBe(true);
    });
  }

  it('текст кнопки', () => {
    const r = ratio(rgbOf(css('.product__buy', 'color')), rgbOf(css('.product__buy', 'background-color')));
    expect(r >= 4.5, `Кнопка: контраст ${r.toFixed(2)} к 1, нужно не меньше 4,5`).toBe(true);
  });
});

describe('устойчивость раскладки', () => {
  it('картинки не искажены и заполняют колонку', () => {
    const img = $('.product__image');
    expect(css(img, 'display'), 'Картинка не должна быть inline: под ней появится зазор').not.toBe('inline');
    expect(css(img, 'object-fit'), 'object-fit у картинки').toBe('cover');
  });

  it('правая колонка не растягивается по высоте левой', () => {
    const info = box('.product__info');
    const gallery = box('.product__gallery');
    expect(info.height < gallery.height, `Колонка информации ${info.height}px должна быть ниже галереи ${gallery.height}px`).toBe(true);
  });
});
