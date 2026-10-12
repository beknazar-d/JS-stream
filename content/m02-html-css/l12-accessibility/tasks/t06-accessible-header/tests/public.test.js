const near = (a, b, d = 2) => Math.abs(a - b) <= d;

function checkLayout(width) {
  const header = box('.header');
  const logo = box('.header__logo');
  const fav = box('.icon-button--fav');
  const cart = box('.icon-button--cart');
  const search = box('.search');
  const input = box('.search__input');
  const button = box('.search__button');
  expect(header.height >= 110 && header.height <= 140, `Высота шапки на ${width}px: ${header.height}, ждали от 110 до 140`).toBe(true);
  expect(near(header.width, width), `Шапка должна занимать всю ширину ${width}px, сейчас ${header.width}px`).toBe(true);
  expect(near(logo.left, 16), `Логотип отстоит от левого края на ${logo.left}px, ждали 16`).toBe(true);
  expect(near(cart.right, width - 16), `Корзина должна быть прижата к правому отступу: right=${cart.right}, ждали ${width - 16}`).toBe(true);
  expect(near(cart.left - fav.right, 8), `Зазор между кнопками ${cart.left - fav.right}px, ждали 8`).toBe(true);
  expect(near(fav.width, 44) && near(fav.height, 44), `«Избранное» ${fav.width} на ${fav.height}, ждали 44 на 44`).toBe(true);
  expect(near(cart.width, 44) && near(cart.height, 44), `«Корзина» ${cart.width} на ${cart.height}, ждали 44 на 44`).toBe(true);
  const rowCenter = (b) => b.top + b.height / 2;
  expect(near(rowCenter(logo), rowCenter(fav), 4) && near(rowCenter(fav), rowCenter(cart), 2), 'Логотип и кнопки стоят в одной строке по центру').toBe(true);
  expect(search.top >= cart.bottom + 8, 'Поиск должен быть второй строкой под кнопками').toBe(true);
  expect(near(search.left, 16) && near(search.right, width - 16), `Форма поиска от ${search.left} до ${search.right}, ждали от 16 до ${width - 16}`).toBe(true);
  expect(near(input.height, 44) && near(button.height, 44), `Поле ${input.height}px и кнопка ${button.height}px по высоте, ждали 44`).toBe(true);
  expect(input.right <= button.left + 1 && input.width > 100, 'Поле и кнопка стоят рядом, поле растянуто').toBe(true);
  expect(document.documentElement.scrollWidth <= width + 1, `Горизонтальная прокрутка на ${width}px: ширина содержимого ${document.documentElement.scrollWidth}`).toBe(true);
}

describe('раскладка шапки', () => {
  it('на 1024', () => {
    checkLayout(1024);
  });

  it('на 375', async () => {
    await viewport(375);
    checkLayout(375);
    await viewport(1024);
  });

  it('бейдж в правом верхнем углу корзины', () => {
    const badge = box('.badge');
    const cart = box('.icon-button--cart');
    expect(badge.right >= cart.right - 4 && badge.right <= cart.right + 10, `Правый край бейджа ${badge.right}, у корзины ${cart.right}`).toBe(true);
    expect(badge.top >= cart.top - 10 && badge.top <= cart.top + 4, `Верх бейджа ${badge.top}, у корзины ${cart.top}`).toBe(true);
    expect($('.badge').textContent.trim(), 'В бейдже цифра 3').toBe('3');
  });
});
