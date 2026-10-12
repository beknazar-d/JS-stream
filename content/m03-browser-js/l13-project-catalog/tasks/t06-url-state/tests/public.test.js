import { titles, expectedTitles, searchPart, settle } from './helpers.js';

const params = (search) => Object.fromEntries(new URLSearchParams(search));

describe('url.js: buildSearch и parseState', () => {
  it('состояние по умолчанию — пустой адрес', () => {
    expect(buildSearch({ q: '', category: '', sort: 'popular', page: 1 }), 'Адрес для состояния по умолчанию').toBe('');
  });

  it('buildSearch пишет параметры в порядке q, category, sort, page', () => {
    const text = buildSearch({ q: 'чайник', category: 'kitchen', sort: 'price-asc', page: 2 });
    expect(text, 'Строка запроса со всеми параметрами').toBe('?q=' + encodeURIComponent('чайник') + '&category=kitchen&sort=price-asc&page=2');
  });

  it('buildSearch пропускает значения по умолчанию', () => {
    expect(buildSearch({ q: '', category: 'climate', sort: 'popular', page: 1 }), 'Только категория').toBe('?category=climate');
  });

  it('parseState читает параметры', () => {
    expect(parseState('?q=' + encodeURIComponent('утюг') + '&sort=price-desc&page=3'), 'Состояние из адреса').toEqual({ q: 'утюг', category: '', sort: 'price-desc', page: 3 });
    expect(parseState(''), 'Пустой адрес').toEqual({ q: '', category: '', sort: 'popular', page: 1 });
  });
});

describe('Адрес страницы и «Назад»', () => {
  it('категория, сортировка и страница пишутся в адрес', async () => {
    await settle();
    expect(searchPart(), 'При старте в адресе нет параметров').toBe('');
    await type('#category', 'kitchen');
    await settle();
    expect(params(searchPart()), 'После выбора категории').toEqual({ category: 'kitchen' });
    await type('#sort', 'price-asc');
    await settle();
    await click('#next');
    await settle();
    expect(params(searchPart()), 'Категория, сортировка и страница').toEqual({ category: 'kitchen', sort: 'price-asc', page: '2' });
  });

  it('«Назад» возвращает предыдущие фильтры: поля, данные', async () => {
    history.back();
    await wait(60);
    await settle();
    expect($('#category').value, 'Категория в поле').toBe('kitchen');
    expect($('#sort').value, 'Сортировка в поле').toBe('price-asc');
    expect($('#page-info').textContent.trim(), 'Подпись страниц после возврата').toBe('Страница 1 из 2');
    expect(titles(), 'Товары после возврата').toEqual(expectedTitles({ category: 'kitchen', sort: 'price-asc' }));
  });

  it('«Назад» до первой записи показывает весь каталог', async () => {
    history.back();
    await wait(60);
    history.back();
    await wait(60);
    await settle();
    expect($('#category').value, 'Категория сброшена').toBe('');
    expect($('#sort').value, 'Сортировка сброшена').toBe('popular');
    expect(titles(), 'Полный каталог').toEqual(expectedTitles());
  });

  it('«Вперёд» снова применяет фильтры', async () => {
    history.forward();
    await wait(60);
    await settle();
    expect($('#category').value, 'Категория вернулась').toBe('kitchen');
    expect(titles(), 'Товары категории').toEqual(expectedTitles({ category: 'kitchen' }));
  });
});
