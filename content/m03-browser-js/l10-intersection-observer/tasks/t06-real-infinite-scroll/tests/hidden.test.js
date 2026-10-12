import { installFakeObserver } from './fake-io.js';

const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
let io;
afterEach(() => io?.restore());

describe('Индикатор и защита от двойной загрузки', () => {
  it('во время загрузки виден индикатор', async () => {
    io = installFakeObserver();
    window.initInfiniteScroll();
    io.fire($('#sentinel'));
    expect($('#status').hidden, 'Пока идёт запрос страницы 3, индикатор виден').toBe(false);
    await waitFor(() => ids().length === 18, 1500);
    expect($('#status').hidden, 'После ответа индикатор скрыт').toBe(true);
  });

  it('повторные уведомления во время загрузки не дублируют запрос', async () => {
    io = installFakeObserver();
    window.initInfiniteScroll();
    const before = api().calls.length;
    io.fire($('#sentinel'));
    io.fireAnyway($('#sentinel'));
    io.fireAnyway($('#sentinel'));
    await waitFor(() => ids().length === 20, 1500);
    await wait(250);
    expect(api().calls.length - before, 'Страница 4 запрошена один раз').toBe(1);
    expect(ids(), 'Все двадцать товаров, каждый один раз').toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });
});

describe('Конец ленты', () => {
  it('сообщение, остановка слежения и тишина после последней страницы', async () => {
    expect($('#end').hidden, 'Показано сообщение о конце').toBe(false);
    expect(io.observed().includes($('#sentinel')), 'Сторож больше не наблюдается').toBe(false);
    const before = api().calls.length;
    io.fireAnyway($('#sentinel'));
    await wait(300);
    expect(api().calls.length, 'После конца запросов не бывает').toBe(before);
    expect(window.__pageErrors, 'Ошибок скрипта нет').toEqual([]);
  });
});

describe('Безопасность вывода', () => {
  it('разметка в названии остаётся текстом', () => {
    expect($$('#results b'), 'Элемента b в списке нет').toHaveLength(0);
    const item = $('#results li[data-id="7"]');
    expect(item.textContent, 'Название показано как текст').toContain('<b>Pro</b>');
  });
});
