import { installFakeObserver } from './fake-io.js';

const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
let io;
afterEach(() => io?.restore());

describe('Первая страница', () => {
  it('загружается сразу, один запрос с page=1 и limit=6', async () => {
    await waitFor(() => ids().length === 6, 1500);
    expect(ids(), 'Первые шесть товаров по порядку').toEqual([1, 2, 3, 4, 5, 6]);
    expect(api().calls, 'Один запрос к API').toHaveLength(1);
    expect(api().calls[0].path, 'Путь запроса').toBe('/api/products');
    expect(api().calls[0].query, 'Параметры запроса').toEqual({ page: '1', limit: '6' });
    expect($('#status').hidden, 'После ответа индикатор скрыт').toBe(true);
    expect($('#end').hidden, 'Сообщение о конце ещё не показано').toBe(true);
  });
});

describe('Наблюдатель за сторожем', () => {
  it('настройки и цель слежения', () => {
    io = installFakeObserver();
    window.initInfiniteScroll();
    expect(io.instances, 'Создан один наблюдатель').toHaveLength(1);
    expect(io.observed(), 'Он следит за #sentinel').toEqual([$('#sentinel')]);
    expect(io.instances[0].options.rootMargin, 'Запас 300px снизу').toMatch(/^300px/);
  });

  it('сторож на экране: подгружается вторая страница', async () => {
    io.fire($('#sentinel'));
    await waitFor(() => ids().length === 12, 1500);
    expect(ids(), 'Товары 1–12 по порядку, без дублей').toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(api().calls[1].query, 'Второй запрос просит страницу 2').toEqual({ page: '2', limit: '6' });
    expect($('#status').hidden, 'Индикатор скрыт после ответа').toBe(true);
  });

  it('сторож вне экрана: ничего не загружается', async () => {
    const before = api().calls.length;
    io.fire($('#sentinel'), false);
    await wait(250);
    expect(api().calls.length, 'Новых запросов нет').toBe(before);
    expect(ids(), 'Список не изменился').toHaveLength(12);
  });
});
