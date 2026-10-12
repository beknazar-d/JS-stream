import { titles, expectedTitles, searchPart, settle } from './helpers.js';

const entries = () => window.__history.entries.length;

describe('parseState: мусор в адресе', () => {
  it('неверные значения заменяются значениями по умолчанию', () => {
    expect(parseState('?sort=hack&category=toys&page=abc'), 'Неизвестные sort, category и page=abc').toEqual({ q: '', category: '', sort: 'popular', page: 1 });
    expect(parseState('?page=-2'), 'Отрицательная страница').toEqual({ q: '', category: '', sort: 'popular', page: 1 });
    expect(parseState('?page=2.5'), 'Дробная страница').toEqual({ q: '', category: '', sort: 'popular', page: 1 });
    expect(parseState('?page=0'), 'Нулевая страница').toEqual({ q: '', category: '', sort: 'popular', page: 1 });
  });

  it('параметры нужных значений читаются, пробелы вокруг q обрезаются', () => {
    expect(parseState('?q=%20%D1%83%D1%82%D1%8E%D0%B3%20&category=cleaning&sort=price-asc&page=1'), 'Все параметры').toEqual({ q: 'утюг', category: 'cleaning', sort: 'price-asc', page: 1 });
  });

  it('parseState и buildSearch обратимы', () => {
    const state = { q: 'пылесос', category: 'cleaning', sort: 'price-desc', page: 2 };
    expect(parseState(buildSearch(state)), 'Состояние -> адрес -> состояние').toEqual(state);
  });
});

describe('История: записи', () => {
  it('повторный выбор того же значения не создаёт запись', async () => {
    await settle();
    await type('#category', 'climate');
    await settle();
    const count = entries();
    await type('#category', 'climate');
    await settle();
    expect(entries(), 'Повторный выбор той же категории').toBe(count);
  });

  it('набор текста даёт одну запись после паузы', async () => {
    const count = entries();
    for (const text of ['у', 'ут', 'утю', 'утюг']) {
      await type('#search', text);
      await wait(60);
    }
    await wait(450);
    await settle();
    expect(entries() - count, 'Новых записей после набора слова «утюг»').toBe(1);
    expect(params(searchPart()).q, 'Текст поиска в адресе').toBe('утюг');
  });

  it('новый поиск сбрасывает страницу и убирает page из адреса', async () => {
    await type('#category', '');
    await type('#search', '');
    await wait(450);
    await settle();
    await click('#next');
    await settle();
    expect(params(searchPart()).page, 'Мы на второй странице').toBe('2');
    await type('#search', 'пылесос');
    await wait(450);
    await settle();
    expect(params(searchPart()), 'После нового поиска страница 1 не пишется в адрес').toEqual({ q: 'пылесос' });
  });

  it('«Назад» не добавляет записей и «Вперёд» остаётся доступной', async () => {
    const count = entries();
    history.back();
    await wait(60);
    await settle();
    expect(entries(), 'После «Назад» число записей то же').toBe(count);
    history.forward();
    await wait(60);
    await settle();
    expect(params(searchPart()), 'После «Вперёд» снова поиск пылесоса').toEqual({ q: 'пылесос' });
    expect($('#search').value, 'Текст в поле поиска').toBe('пылесос');
    expect(titles(), 'Результаты поиска').toEqual(expectedTitles({ q: 'пылесос' }));
  });
});

const params = (search) => Object.fromEntries(new URLSearchParams(search));
