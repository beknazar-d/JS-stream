const text = () => document.body.textContent.replace(/\s+/g, ' ');

describe('Рефакторинг: содержимое сохранено', () => {
  it('все исходные тексты на месте', () => {
    const expected = [
      'Домотека', 'Каталог', 'Доставка', 'Контакты', 'Стиральные машины',
      'Bosch WAN 2426', 'Загрузка 7 кг, 1200 об/мин', '32 900 ₽',
      'LG F2V3 GS', 'Загрузка 8 кг, 1200 об/мин', '38 500 ₽',
      'Indesit BWSA 61051', 'Загрузка 6 кг, 1000 об/мин', '21 700 ₽',
      'Как выбрать', 'Для семьи из трёх человек хватит загрузки 7 кг.',
      'Проверьте глубину: узкие модели занимают меньше места.', '© Домотека, 2026',
    ];
    for (const item of expected) expect(text(), `Текст «${item}»`).toContain(item);
  });

  it('ссылки сохранили адреса', () => {
    expect($$('nav a').map((a) => a.getAttribute('href')), 'Адреса ссылок меню').toEqual(['/catalog', '/delivery', '/contacts']);
  });

  it('заголовки идут по порядку без пропусков', () => {
    const levels = $$('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName[1]));
    expect(levels[0], 'Первый заголовок страницы').toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1] <= 1, `Переход h${levels[i - 1]} → h${levels[i]} пропускает уровень`).toBe(true);
    }
    expect(levels.filter((l) => l === 1), 'h1 на странице').toHaveLength(1);
  });

  it('цены остались в абзацах, а aside лежит внутри main', () => {
    expect($$('article p.price, article p'), 'Абзацы внутри карточек').not.toHaveLength(0);
    expect($('main aside'), 'aside внутри main').not.toBeNull();
  });

  it('div почти не осталось', () => {
    expect($$('div').length <= 1, 'Тегов div: ' + $$('div').length + ', допустим один').toBe(true);
  });
});
