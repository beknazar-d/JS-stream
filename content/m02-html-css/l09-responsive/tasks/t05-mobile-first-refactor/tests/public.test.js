const tops = (selector) => $$(selector).map((el) => box(el).top);

describe('Поведение не изменилось', () => {
  it('на телефоне (375px) меню в столбик, преимущества в одну колонку', async () => {
    await viewport(375);
    const links = tops('.nav__link');
    expect(links[1], 'Вторая ссылка меню под первой').toBeGreaterThan(links[0]);
    expect(links[2], 'Третья ссылка меню под второй').toBeGreaterThan(links[1]);
    const items = tops('.features__item');
    expect(items[1], 'Второе преимущество под первым').toBeGreaterThan(items[0]);
    await viewport(1024);
  });

  it('на компьютере (1024px) меню в строку, преимущества в три колонки', () => {
    const links = tops('.nav__link');
    expect(new Set(links).size, 'Все ссылки меню на одной высоте').toBe(1);
    const items = tops('.features__item');
    expect(new Set(items).size, 'Три преимущества в одном ряду').toBe(1);
  });
});

describe('Подход «сначала телефон»', () => {
  it('в стилях нет медиазапросов с max-width', () => {
    const queries = [];
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) if (rule instanceof CSSMediaRule) queries.push(rule.media.mediaText);
    }
    expect(queries.length, 'Медиазапросы должны остаться: без них страница не будет адаптивной').toBeGreaterThan(0);
    expect(queries.filter((text) => /max-width/.test(text)), 'Запросы с max-width нужно заменить на min-width').toEqual([]);
  });

  it('есть медиазапрос с min-width', () => {
    const queries = [];
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) if (rule instanceof CSSMediaRule) queries.push(rule.media.mediaText);
    }
    expect(queries.some((text) => /min-width/.test(text)), 'Нужен хотя бы один запрос с min-width').toBe(true);
  });
});
