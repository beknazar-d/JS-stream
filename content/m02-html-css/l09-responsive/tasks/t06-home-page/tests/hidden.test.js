const near = (a, b, tolerance = 2) => Math.abs(a - b) <= tolerance;
const fontSize = () => parseFloat(css('.hero__title', 'font-size'));

describe('Заголовок плавно растёт и упирается в потолок', () => {
  it('на 768px размер между 32px и 38px', async () => {
    await viewport(768);
    expect(fontSize(), `На 768px заголовок промежуточного размера, сейчас ${fontSize()}px`).toBeGreaterThanOrEqual(32);
    expect(fontSize(), `На 768px заголовок промежуточного размера, сейчас ${fontSize()}px`).toBeLessThanOrEqual(38);
    await viewport(1024);
  });

  it('на 1440px заголовок не больше 40px', async () => {
    await viewport(1440);
    expect(near(fontSize(), 40, 1), `Потолок размера 40px, сейчас ${fontSize()}px`).toBe(true);
    await viewport(1024);
  });
});

describe('Широкий экран', () => {
  it('на 1440px контент не шире 960px и стоит по центру', async () => {
    await viewport(1440);
    const image = box('.hero__image');
    expect(image.width, 'Контент на широком экране не должен растягиваться шире 960px').toBeLessThanOrEqual(960);
    expect(near(image.left + image.width / 2, 720), 'Контент по центру экрана 1440px').toBe(true);
    expect(document.documentElement.scrollWidth, 'Нет горизонтальной прокрутки на 1440px').toBeLessThanOrEqual(1440);
    await viewport(1024);
  });

  it('на 1440px картинка сохраняет пропорции 2 к 1', async () => {
    await viewport(1440);
    const image = box('.hero__image');
    expect(near(image.height * 2, image.width, 4), 'Высота вдвое меньше ширины').toBe(true);
    await viewport(1024);
  });
});

describe('Шапка на планшете', () => {
  it('на 768px всё в строку, корзина у правого отступа', async () => {
    await viewport(768);
    const logo = box('.header__logo');
    const cart = box('.header__cart');
    expect(near(logo.left, 16), 'Логотип у левого отступа 16px').toBe(true);
    expect(near(cart.right, 768 - 16), 'Корзина у правого отступа 16px').toBe(true);
    await viewport(1024);
  });

  it('на 767px шапка ещё в столбик, а товары по два', async () => {
    await viewport(767);
    expect(box('.header__nav').top, 'На 767px меню под логотипом').toBeGreaterThanOrEqual(box('.header__logo').bottom - 1);
    expect(box('.products__item:nth-child(3)').top, 'На 767px третий товар на новой строке').toBeGreaterThan(box('.products__item:nth-child(1)').bottom - 1);
    await viewport(1024);
  });
});
