describe('Семантика страницы категории', () => {
  it('шапка с меню-списком', () => {
    expect($('body > header'), 'Тег header в body').not.toBeNull();
    expect($$('header nav ul > li > a'), 'Ссылок в списке меню').toHaveLength(3);
  });

  it('основная часть и главный заголовок', () => {
    expect($$('main'), 'Тегов main').toHaveLength(1);
    expect($$('h1'), 'Заголовков h1').toHaveLength(1);
    expect($('main h1').textContent.trim(), 'Текст h1').toBe('Стиральные машины');
  });

  it('товары — список из трёх карточек article', () => {
    expect($$('main ul > li > article'), 'Карточек article в списке').toHaveLength(3);
    expect($$('article h2'), 'Заголовков h2 внутри article').toHaveLength(3);
  });

  it('совет и подвал размечены своими тегами', () => {
    expect($('aside h2'), 'aside с заголовком h2').not.toBeNull();
    expect($('body > footer'), 'Тег footer в body').not.toBeNull();
  });
});
