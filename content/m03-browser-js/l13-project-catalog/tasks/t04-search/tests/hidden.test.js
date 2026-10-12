import { titles, expectedTitles, settle } from './helpers.js';

describe('Поиск и страницы', () => {
  it('новый поиск со страницы 3 идёт с page=1', async () => {
    await settle();
    await type('#search', '');
    await wait(450);
    await settle();
    await click('#next');
    await settle();
    await click('#next');
    await settle();
    expect($('#page-info').textContent.trim(), 'Перед поиском мы на третьей странице').toBe('Страница 3 из 4');
    const before = shopServer.calls.length;
    await type('#search', 'пылесос');
    await wait(450);
    await settle();
    const last = shopServer.calls[shopServer.calls.length - 1];
    expect(shopServer.calls.length - before, 'Один запрос поиска').toBe(1);
    expect(last.page, 'Номер страницы в запросе поиска').toBe('1');
    expect(titles(), 'Показаны результаты, а не пустая третья страница').toEqual(expectedTitles({ q: 'пылесос' }));
  });
});

describe('Устаревшие ответы', () => {
  it('медленный ответ на «пар» не заменяет «парогенератор»', async () => {
    await settle();
    shopServer.delayFor = (query) => (query.q === 'пар' ? 600 : 30);
    const original = window.fetch;
    const signals = [];
    window.fetch = (url, init) => {
      signals.push(init && init.signal);
      return original(url, init);
    };
    try {
      await type('#search', '');
      await wait(450);
      await settle();
      signals.length = 0;
      await type('#search', 'пар');
      await wait(340);
      await type('#search', 'парогенератор');
      await wait(400);
      await settle();
      expect(titles(), 'На экране результаты последнего запроса').toEqual(expectedTitles({ q: 'парогенератор' }));
      expect(signals.length, 'Два запроса: «пар» и «парогенератор»').toBe(2);
      expect(signals[0] && signals[0].aborted, 'Первый запрос отменён через AbortController (передайте signal в fetch)').toBe(true);
      expect($('#status').textContent, 'Отмена не показывается как ошибка').toBe('');
      expect($('#retry').hidden, 'Кнопка повтора скрыта после отмены').toBe(true);
    } finally {
      window.fetch = original;
      shopServer.delayFor = null;
    }
  });
});

describe('Ошибка поиска', () => {
  it('«Повторить» повторяет запрос с тем же текстом', async () => {
    await settle();
    shopServer.failNext = 1;
    await type('#search', 'утюг');
    await wait(450);
    await settle();
    expect($('#status').textContent, 'Статус при ошибке').toBe('Не удалось загрузить каталог');
    const before = shopServer.calls.length;
    await click('#retry');
    await settle();
    const retry = shopServer.calls[before];
    expect(retry.q, 'Повтор идёт с тем же текстом поиска').toBe('утюг');
    expect(titles(), 'После повтора результаты поиска').toEqual(expectedTitles({ q: 'утюг' }));
  });
});
