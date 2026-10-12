const tops = (selector) => $$(selector).map((el) => box(el).top);

describe('Граница между телефоном и планшетом', () => {
  it('на 767px ещё телефонная раскладка', async () => {
    await viewport(767);
    const links = tops('.nav__link');
    expect(links[1], 'На 767px меню ещё в столбик').toBeGreaterThan(links[0]);
    const items = tops('.features__item');
    expect(items[1], 'На 767px преимущества ещё в одну колонку').toBeGreaterThan(items[0]);
    await viewport(1024);
  });

  it('на 768px уже широкая раскладка', async () => {
    await viewport(768);
    expect(new Set(tops('.nav__link')).size, 'На 768px меню в строку').toBe(1);
    expect(new Set(tops('.features__item')).size, 'На 768px преимущества в один ряд').toBe(1);
    await viewport(1024);
  });

  it('зазоры не потерялись', async () => {
    await viewport(375);
    const first = box('.nav__link:not(:empty)');
    const second = box('.nav li:nth-child(2) .nav__link');
    expect(second.top - first.bottom, 'Между ссылками меню на телефоне остаётся промежуток').toBeGreaterThanOrEqual(6);
    await viewport(1024);
    const a = box('.features__item:nth-child(1)');
    const b = box('.features__item:nth-child(2)');
    expect(Math.abs(b.left - a.right - 16), 'Зазор между карточками на компьютере 16px').toBeLessThanOrEqual(2);
  });
});
