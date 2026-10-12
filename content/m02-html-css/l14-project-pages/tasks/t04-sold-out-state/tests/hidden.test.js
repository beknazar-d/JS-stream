const near = (a, b, d = 2) => Math.abs(a - b) <= d;
const product = () => $('.product');
const soldOut = (on) => product().classList.toggle('product--sold-out', on);
const visible = (sel) => css(sel, 'display') !== 'none' && box(sel).height > 0;
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

describe('контраст нового состояния', () => {
  it('бейдж', () => {
    soldOut(true);
    const bg = rgbOf(css('.product__badge', 'background-color'));
    expect(bg.join() !== WHITE.join(), 'Фон бейджа не белый').toBe(true);
    const r = ratio(rgbOf(css('.product__badge', 'color')), bg);
    expect(r >= 4.5, `Бейдж: контраст ${r.toFixed(2)} к 1, нужно не меньше 4,5`).toBe(true);
    soldOut(false);
  });

  it('цена и ссылка', () => {
    soldOut(true);
    const price = ratio(rgbOf(css('.product__price', 'color')), WHITE);
    expect(price >= 4.5, `Цена: ${price.toFixed(2)} к 1`).toBe(true);
    const link = ratio(rgbOf(css('.product__notify', 'color')), WHITE);
    expect(link >= 4.5, `Ссылка: ${link.toFixed(2)} к 1`).toBe(true);
    soldOut(false);
  });
});

describe('раскладка не сдвигается', () => {
  it('колонки на месте, 1024', () => {
    soldOut(false);
    const before = { g: box('.product__gallery'), i: box('.product__info') };
    soldOut(true);
    const g = box('.product__gallery');
    const i = box('.product__info');
    expect(near(g.left, before.g.left) && near(g.width, before.g.width), 'Галерея не сдвинулась').toBe(true);
    expect(near(i.left, before.i.left) && near(i.top, before.i.top), 'Колонка информации не сдвинулась').toBe(true);
    soldOut(false);
  });

  it('телефон 375, состояние включено', async () => {
    await viewport(375);
    soldOut(true);
    const n = box('.product__notify');
    expect(near(n.width, 343), `Ссылка на 375: ${n.width}, ждали всю ширину 343`).toBe(true);
    expect(n.height >= 44, `Высота ссылки ${n.height}`).toBe(true);
    expect(document.documentElement.scrollWidth <= 376, 'Нет горизонтальной прокрутки').toBe(true);
    soldOut(false);
    await viewport(1024);
  });

  it('телефон 375, обычная карточка', async () => {
    await viewport(375);
    soldOut(false);
    const b = box('.product__buy');
    expect(near(b.width, 343) && b.height >= 44, `Кнопка на 375: ${b.width} на ${b.height}`).toBe(true);
    expect(visible('.product__notify') || visible('.product__badge'), 'Новые элементы скрыты').toBe(false);
    await viewport(1024);
  });

  it('снятие класса возвращает вид', () => {
    soldOut(true);
    soldOut(false);
    expect(css('.product__image', 'filter'), 'Фильтр вернулся').toBe('none');
    expect(visible('.product__buy'), 'Кнопка вернулась').toBe(true);
    expect(css('.product__price', 'color'), 'Цвет цены вернулся').toBe('rgb(26, 26, 26)');
  });
});

describe('способ записи', () => {
  it('нет !important', () => {
    const src = $('style[data-file="styles.css"]').textContent;
    expect(/!\s*important/.test(src), 'Нужно убрать !important').toBe(false);
  });

  it('разметка не изменилась', () => {
    expect($$('.product__badge, .product__notify'), 'Новых элементов два').toHaveLength(2);
    expect($('.product__buy').tagName, 'Кнопка осталась button').toBe('BUTTON');
  });
});
