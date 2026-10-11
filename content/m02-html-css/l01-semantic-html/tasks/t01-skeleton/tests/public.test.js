describe('Каркас страницы', () => {
  it('шапка, основная часть и подвал лежат прямо в body', () => {
    expect($('body > header'), 'Тег header прямо в body').not.toBeNull();
    expect($('body > main'), 'Тег main прямо в body').not.toBeNull();
    expect($('body > footer'), 'Тег footer прямо в body').not.toBeNull();
  });

  it('меню — nav внутри шапки, в нём три ссылки', () => {
    const links = $$('header nav a');
    expect(links, 'Ссылок в меню header nav').toHaveLength(3);
    expect(links.map((a) => a.textContent.trim()), 'Тексты ссылок').toEqual(['Каталог', 'Доставка', 'Контакты']);
  });

  it('один заголовок первого уровня в main', () => {
    expect($$('h1'), 'Заголовков h1 на странице').toHaveLength(1);
    expect($('main h1'), 'h1 внутри main').not.toBeNull();
    expect($('main h1').textContent.trim(), 'Текст заголовка').toBe('Холодильники');
  });

  it('в подвале есть строка с названием магазина', () => {
    expect($('footer'), 'Тег footer на странице').not.toBeNull();
    expect($('footer').textContent, 'Текст подвала').toContain('© Домотека');
  });
});
