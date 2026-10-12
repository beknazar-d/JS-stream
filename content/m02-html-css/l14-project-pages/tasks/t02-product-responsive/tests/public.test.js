const near = (a, b, d = 2) => Math.abs(a - b) <= d;
const noOverflow = (w) => expect(document.documentElement.scrollWidth <= w + 1, `Горизонтальная прокрутка на ${w}px: ширина содержимого ${document.documentElement.scrollWidth}`).toBe(true);

describe('1024: прежний вид', () => {
  it('две колонки, картинка 480 на 360', () => {
    const g = box('.product__gallery');
    const i = box('.product__info');
    const img = box('.product__image');
    expect(near(g.width, 480) && near(i.left - g.right, 32), `Галерея ${g.width}, зазор ${i.left - g.right}`).toBe(true);
    expect(near(img.width, 480) && near(img.height, 360), `Картинка ${img.width} на ${img.height}`).toBe(true);
    const t = box('.product__thumb');
    expect(near(t.width, 96) && near(t.height, 72), `Миниатюра ${t.width} на ${t.height}`).toBe(true);
  });
});

describe('375: телефон', () => {
  it('нет горизонтальной прокрутки, блоки в пределах окна', async () => {
    await viewport(375);
    noOverflow(375);
    for (const sel of ['.product', '.product__image', '.product__info', '.product__buy', '.product__specs']) {
      expect(box(sel).right <= 375 + 1, `${sel} выходит за правый край: right=${box(sel).right}`).toBe(true);
    }
    await viewport(1024);
  });

  it('одна колонка, отступы по 16', async () => {
    await viewport(375);
    const p = box('.product');
    expect(near(p.left, 16) && near(p.width, 343), `Карточка: left=${p.left}, width=${p.width}, ждали 16 и 343`).toBe(true);
    expect(box('.product__info').top >= box('.product__gallery').bottom, 'Информация под галереей').toBe(true);
    await viewport(1024);
  });
});
