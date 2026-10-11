const near = (a, b, tolerance = 2) => Math.abs(a - b) <= tolerance;
const fontSize = () => parseFloat(css('.hero__title', 'font-size'));
const noSideScroll = (width) => expect(document.documentElement.scrollWidth, `При ширине ${width}px страница не должна прокручиваться вбок`).toBeLessThanOrEqual(width);

describe('Основа адаптивности', () => {
  it('есть метатег viewport', () => {
    const content = $('meta[name="viewport"]')?.getAttribute('content') ?? '';
    expect(content, 'Добавьте meta name="viewport" content="width=device-width, initial-scale=1"').toMatch(/width=device-width/);
  });

  it('страница не прокручивается вбок на 375, 768 и 1024px', async () => {
    for (const width of [375, 768, 1024]) {
      await viewport(width);
      noSideScroll(width);
    }
    await viewport(1024);
  });
});

describe('Заголовок', () => {
  it('на телефоне 24px, на компьютере 40px', async () => {
    await viewport(375);
    expect(near(fontSize(), 24, 1), `На 375px размер заголовка должен быть 24px, сейчас ${fontSize()}px`).toBe(true);
    await viewport(1024);
    expect(near(fontSize(), 40, 1), `На 1024px размер заголовка должен быть 40px, сейчас ${fontSize()}px`).toBe(true);
  });
});

describe('Шапка', () => {
  it('на телефоне логотип, меню и корзина идут друг под другом', async () => {
    await viewport(375);
    const logo = box('.header__logo');
    const nav = box('.header__nav');
    const cart = box('.header__cart');
    expect(nav.top, 'Меню под логотипом').toBeGreaterThanOrEqual(logo.bottom - 1);
    expect(cart.top, 'Корзина под меню').toBeGreaterThanOrEqual(nav.bottom - 1);
    await viewport(1024);
  });

  it('на компьютере всё в одну строку', () => {
    const logo = box('.header__logo');
    const nav = box('.header__nav');
    const cart = box('.header__cart');
    expect(nav.left, 'Меню правее логотипа').toBeGreaterThanOrEqual(logo.right - 1);
    expect(cart.left, 'Корзина правее меню').toBeGreaterThanOrEqual(nav.right - 1);
    expect(near(logo.top + logo.height / 2, cart.top + cart.height / 2, 12), 'Логотип и корзина на одной линии').toBe(true);
  });
});

describe('Картинка и товары', () => {
  it('на 375px картинка занимает ширину контента и сохраняет пропорции 2 к 1', async () => {
    await viewport(375);
    const image = box('.hero__image');
    expect(near(image.width, 343), `Ширина картинки на телефоне: 375 минус отступы 16px, сейчас ${image.width}px`).toBe(true);
    expect(near(image.height * 2, image.width, 4), 'Высота картинки вдвое меньше ширины').toBe(true);
    await viewport(1024);
  });

  it('товары: по два в ряду на телефоне, по четыре на компьютере', async () => {
    await viewport(375);
    let items = $$('.products__item').map((_, i) => box(`.products__item:nth-child(${i + 1})`));
    expect(items[1].top, 'На 375px первые два товара в одном ряду').toBe(items[0].top);
    expect(items[2].top, 'На 375px третий товар на новой строке').toBeGreaterThan(items[0].bottom - 1);
    await viewport(1024);
    items = $$('.products__item').map((_, i) => box(`.products__item:nth-child(${i + 1})`));
    expect(new Set(items.map((item) => item.top)).size, 'На 1024px все четыре товара в одном ряду').toBe(1);
  });
});
