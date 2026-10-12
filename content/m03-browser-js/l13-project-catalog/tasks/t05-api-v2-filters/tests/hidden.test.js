import { titles, expectedTitles, settle } from './helpers.js';

describe('Фильтры вместе', () => {
  it('смена категории или сортировки сбрасывает страницу на 1', async () => {
    await settle();
    await click('#next');
    await settle();
    await click('#next');
    await settle();
    expect($('#page-info').textContent.trim(), 'Перед сменой фильтра третья страница').toBe('Страница 3 из 4');
    await type('#category', 'climate');
    await settle();
    expect(shopServer.calls[shopServer.calls.length - 1].page, 'Страница в запросе после смены категории').toBe('1');
    expect(titles(), 'Товары климата, а не пустая страница').toEqual(expectedTitles({ category: 'climate' }));
    await type('#category', '');
    await settle();
    await click('#next');
    await settle();
    await type('#sort', 'price-desc');
    await settle();
    expect(shopServer.calls[shopServer.calls.length - 1].page, 'Страница в запросе после смены сортировки').toBe('1');
  });

  it('поиск, категория и сортировка в одном запросе', async () => {
    await type('#category', 'cleaning');
    await type('#sort', 'price-asc');
    await type('#search', 'пылесос');
    await wait(450);
    await settle();
    const call = shopServer.calls[shopServer.calls.length - 1];
    expect({ q: call.q, category: call.category, sort: call.sort, page: call.page }, 'Все текущие значения в последнем запросе').toEqual({ q: 'пылесос', category: 'cleaning', sort: 'price-asc', page: '1' });
    expect(titles(), 'Дешёвые пылесосы из уборки по возрастанию цены').toEqual(expectedTitles({ q: 'пылесос', category: 'cleaning', sort: 'price-asc' }));
  });

  it('при смене категории поиск не теряется', async () => {
    await type('#category', 'kitchen');
    await settle();
    expect(shopServer.calls[shopServer.calls.length - 1].q, 'Текст поиска остаётся в запросе после смены категории').toBe('пылесос');
    expect($('#status').textContent, 'Пустая выдача: сообщение').toBe('Ничего не найдено');
  });

  it('ошибка сервера: «Повторить» шлёт тот же набор параметров', async () => {
    await settle();
    shopServer.failNext = 1;
    await type('#sort', 'price-desc');
    await settle();
    expect($('#status').textContent, 'Статус ошибки').toBe('Не удалось загрузить каталог');
    const failed = shopServer.calls[shopServer.calls.length - 1];
    const before = shopServer.calls.length;
    await click('#retry');
    await settle();
    expect(shopServer.calls[before], 'Повтор — тот же запрос').toEqual(failed);
  });

  it('очистка фильтров возвращает весь каталог', async () => {
    await type('#search', '');
    await type('#category', '');
    await type('#sort', 'popular');
    await wait(450);
    await settle();
    expect(titles(), 'Каталог целиком').toEqual(expectedTitles());
    expect($('#status').textContent, 'Статус пуст').toBe('');
  });
});
