const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('375: размеры', () => {
  it('картинка 4 к 3 на всю ширину карточки', async () => {
    await viewport(375);
    const img = box('.product__image');
    expect(near(img.width, 343), `Ширина картинки ${img.width}, ждали 343`).toBe(true);
    expect(near(img.height, 343 * 0.75, 3), `Высота картинки ${img.height}, ждали около 257`).toBe(true);
    await viewport(1024);
  });

  it('миниатюры делят ширину поровну и умещаются', async () => {
    await viewport(375);
    const thumbs = $$('.product__thumb').map((t) => box(t));
    expect(near(thumbs[0].width, thumbs[1].width) && near(thumbs[1].width, thumbs[2].width), 'Миниатюры одной ширины').toBe(true);
    expect(thumbs[2].right <= box('.product__image').right + 1, 'Миниатюры не выходят за картинку').toBe(true);
    expect(thumbs[0].top === thumbs[2].top, 'Миниатюры в один ряд').toBe(true);
    await viewport(1024);
  });

  it('заголовок и кнопка', async () => {
    await viewport(375);
    expect(parseFloat(css('.product__title', 'font-size')) <= 28, `Заголовок ${css('.product__title', 'font-size')} на телефоне крупнее 28px`).toBe(true);
    const b = box('.product__buy');
    expect(near(b.width, 343), `Кнопка ${b.width}px, ждали всю ширину 343`).toBe(true);
    expect(b.height >= 44, `Высота кнопки ${b.height}px, ждали не меньше 44`).toBe(true);
    await viewport(1024);
  });
});

describe('768 и границы', () => {
  it('768: одна колонка без прокрутки, заголовок 32, кнопка 200', async () => {
    await viewport(768);
    expect(document.documentElement.scrollWidth <= 769, 'Нет горизонтальной прокрутки на 768').toBe(true);
    expect(box('.product__info').top >= box('.product__gallery').bottom, 'На 768 одна колонка').toBe(true);
    expect(css('.product__title', 'font-size'), 'Заголовок на 768').toBe('32px');
    expect(near(box('.product__buy').width, 200), 'Кнопка на 768 шириной 200').toBe(true);
    await viewport(1024);
  });

  it('899: одна колонка, расстояние 24', async () => {
    await viewport(899);
    const g = box('.product__gallery');
    const i = box('.product__info');
    expect(i.top >= g.bottom, 'На 899 информация под галереей').toBe(true);
    expect(near(i.top - g.bottom, 24, 3), `Расстояние ${i.top - g.bottom}, ждали 24`).toBe(true);
    await viewport(1024);
  });

  it('900: две колонки', async () => {
    await viewport(900);
    const g = box('.product__gallery');
    const i = box('.product__info');
    expect(i.left >= g.right && near(i.top, g.top, 4), `На 900 две колонки: info.left=${i.left}, gallery.right=${g.right}`).toBe(true);
    expect(near(g.width, 480), `Галерея на 900: ${g.width}`).toBe(true);
    await viewport(1024);
  });
});
