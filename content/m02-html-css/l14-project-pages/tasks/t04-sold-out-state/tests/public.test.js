const near = (a, b, d = 2) => Math.abs(a - b) <= d;
const product = () => $('.product');
const soldOut = (on) => product().classList.toggle('product--sold-out', on);
const visible = (sel) => css(sel, 'display') !== 'none' && box(sel).height > 0;

describe('без модификатора: прежний вид', () => {
  it('бейдж и ссылка скрыты, кнопка видна', () => {
    soldOut(false);
    expect(visible('.product__badge'), 'Бейдж скрыт по умолчанию').toBe(false);
    expect(visible('.product__notify'), 'Ссылка «Сообщить о поступлении» скрыта по умолчанию').toBe(false);
    const b = box('.product__buy');
    expect(near(b.width, 200) && near(b.height, 48), `Кнопка ${b.width} на ${b.height}`).toBe(true);
  });

  it('картинка и цена как раньше', () => {
    soldOut(false);
    expect(css('.product__image', 'filter'), 'Фильтр картинки').toBe('none');
    expect(css('.product__image', 'opacity'), 'Прозрачность картинки').toBe('1');
    expect(css('.product__price', 'color'), 'Цвет цены').toBe('rgb(26, 26, 26)');
    expect(visible('.product__old-price'), 'Старая цена видна').toBe(true);
  });
});

describe('с модификатором product--sold-out', () => {
  it('виден бейдж «Нет в наличии» над заголовком', () => {
    soldOut(true);
    expect(visible('.product__badge'), 'Бейдж виден').toBe(true);
    expect($('.product__badge').textContent.trim(), 'Текст бейджа').toBe('Нет в наличии');
    expect(box('.product__badge').bottom <= box('.product__title').top + 1, 'Бейдж над заголовком').toBe(true);
    expect(css('.product__badge', 'font-size'), 'Размер бейджа').toBe('14px');
    expect(Number(css('.product__badge', 'font-weight')) >= 600, 'Бейдж жирный').toBe(true);
    soldOut(false);
  });

  it('кнопка и старая цена скрыты', () => {
    soldOut(true);
    expect(visible('.product__buy'), 'Кнопка «В корзину» скрыта').toBe(false);
    expect(visible('.product__old-price'), 'Старая цена скрыта').toBe(false);
    soldOut(false);
  });

  it('ссылка о поступлении 200 на 48', () => {
    soldOut(true);
    const n = box('.product__notify');
    expect(near(n.width, 200) && near(n.height, 48), `Ссылка ${n.width} на ${n.height}, ждали 200 на 48`).toBe(true);
    expect(css('.product__notify', 'text-decoration-line'), 'Без подчёркивания').toBe('none');
    expect(css('.product__notify', 'border-top-width'), 'Рамка 2px').toBe('2px');
    expect(css('.product__notify', 'border-top-color'), 'Цвет рамки').toBe('rgb(11, 61, 145)');
    soldOut(false);
  });

  it('картинка обесцвечена, цена серая', () => {
    soldOut(true);
    expect(css('.product__image', 'filter').includes('grayscale'), 'Картинка: filter с grayscale').toBe(true);
    expect(Number(css('.product__image', 'opacity')) < 1, 'Картинка полупрозрачна').toBe(true);
    expect(css('.product__price', 'color'), 'Цена перекрашена').not.toBe('rgb(26, 26, 26)');
    soldOut(false);
  });
});
