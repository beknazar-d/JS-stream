const near = (a, b, message, tol = 2) => expect(Math.abs(a - b), message + ` (получено ${a}, ожидалось около ${b})`).toBeLessThanOrEqual(tol);

describe('Страница товара', () => {
  it('две колонки с пропорцией 1.2 к 1 и промежутком 24px', () => {
    const g = box('.gallery');
    const t = box('.title');
    near(t.left - g.right, 24, 'Промежуток между колонками');
    near(g.width / t.width, 1.2, 'Отношение ширины фото к ширине правой колонки', 0.03);
    near(t.right, box('main').right, 'Правая колонка у правого края main');
  });

  it('фото занимает три ряда слева: от заголовка до кнопки', () => {
    const g = box('.gallery');
    near(g.top, box('.title').top, 'Верх фото на уровне заголовка');
    near(g.bottom, box('.buy').bottom, 'Низ фото на уровне блока с кнопкой');
  });

  it('заголовок, цена и кнопка идут сверху вниз в правой колонке', () => {
    const t = box('.title');
    const p = box('.price');
    const b = box('.buy');
    expect(p.top, 'Цена ниже заголовка').toBeGreaterThanOrEqual(t.bottom);
    expect(b.top, 'Кнопка ниже цены').toBeGreaterThanOrEqual(p.bottom);
    near(p.left, t.left, 'Цена и заголовок в одной колонке');
    near(b.left, t.left, 'Кнопка и заголовок в одной колонке');
  });

  it('описание на всю ширину под фото и кнопкой', () => {
    const a = box('.about');
    near(a.left, box('.gallery').left, 'Описание от левого края');
    near(a.right, box('main').right, 'Описание до правого края');
    expect(a.top, 'Описание ниже фото').toBeGreaterThanOrEqual(box('.gallery').bottom);
  });

  it('характеристики слева, отзывы справа в одном ряду', () => {
    const s = box('.specs');
    const r = box('.reviews');
    near(s.left, box('.gallery').left, 'Характеристики в левой колонке');
    near(r.left, box('.title').left, 'Отзывы в правой колонке');
    near(s.top, r.top, 'Блоки в одном ряду');
    expect(s.top, 'Ряд ниже описания').toBeGreaterThanOrEqual(box('.about').bottom);
  });
});
