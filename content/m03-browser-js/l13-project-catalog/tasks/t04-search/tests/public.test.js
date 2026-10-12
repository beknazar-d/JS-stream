import { titles, expectedTitles, reference, settle } from './helpers.js';

const calls = (from) => shopServer.calls.slice(from);

describe('Поиск при вводе', () => {
  it('на ввод «п», «пыл», «пылесос» уходит один запрос с q=пылесос', async () => {
    await settle();
    const before = shopServer.calls.length;
    for (const text of ['п', 'пыл', 'пылесос']) {
      await type('#search', text);
      await wait(60);
    }
    await wait(520);
    await settle();
    expect(calls(before).map((c) => c.q), 'Запросы после ввода с паузами по 60 мс').toEqual(['пылесос']);
    expect(titles(), 'Результаты поиска «пылесос»').toEqual(expectedTitles({ q: 'пылесос' }));
    expect($('#total').textContent.trim(), 'Общее число найденных').toBe('Найдено: ' + reference({ q: 'пылесос' }).total);
  });

  it('при поиске подпись «Страница 1 из 1», обе кнопки отключены', () => {
    expect($('#page-info').textContent.trim(), 'Три результата умещаются на одной странице').toBe('Страница 1 из 1');
    expect($('#prev').disabled && $('#next').disabled, 'Обе кнопки отключены').toBe(true);
  });

  it('если ничего не найдено — сообщение', async () => {
    await type('#search', 'самовар');
    await wait(450);
    await settle();
    expect($('#status').textContent, 'Статус при пустой выдаче').toBe('Ничего не найдено');
    expect($('#grid .card'), 'Карточек нет').toBeNull();
  });

  it('пустое поле возвращает весь каталог без параметра q', async () => {
    const before = shopServer.calls.length;
    await type('#search', '');
    await wait(450);
    await settle();
    const last = calls(before)[calls(before).length - 1];
    expect(last, 'После очистки поля уходит запрос').toBeDefined();
    expect('q' in last, 'Параметр q не добавляется, если поле пустое').toBe(false);
    expect(titles(), 'Каталог целиком, первая страница').toEqual(expectedTitles());
  });
});
