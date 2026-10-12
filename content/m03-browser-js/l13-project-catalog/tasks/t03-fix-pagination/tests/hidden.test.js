import { titles, expectedTitles, settle } from './helpers.js';

const validPages = () => shopServer.calls.every((call) => Number(call.page) >= 1 && Number(call.page) <= 4);

describe('Границы и обновление', () => {
  it('частые нажатия «Вперёд» не уводят за последнюю страницу', async () => {
    await settle();
    while (!$('#prev').disabled) {
      await click('#prev');
      await settle();
    }
    for (let i = 0; i < 10; i++) await click('#next');
    await settle();
    expect(validPages(), 'Ни один запрос не должен просить страницу больше 4 или меньше 1').toBe(true);
    expect($('#page-info').textContent.trim(), 'После десяти нажатий').toBe('Страница 4 из 4');
    expect(titles(), 'Товары последней страницы').toEqual(expectedTitles({ page: 4 }));
  });

  it('частые нажатия «Назад» останавливаются на первой странице', async () => {
    for (let i = 0; i < 10; i++) await click('#prev');
    await settle();
    expect(validPages(), 'Ни один запрос не должен просить страницу меньше 1').toBe(true);
    expect($('#page-info').textContent.trim(), 'После десяти нажатий «Назад»').toBe('Страница 1 из 4');
    expect($('#prev').disabled, 'На первой странице «Назад» отключена').toBe(true);
  });

  it('«Обновить» перезагружает текущую страницу', async () => {
    await click('#next');
    await settle();
    const before = shopServer.calls.length;
    await click('#reload');
    await settle();
    expect(shopServer.calls.length - before, 'Один запрос').toBe(1);
    expect(shopServer.calls[shopServer.calls.length - 1].page, 'Страница в запросе после «Обновить»').toBe('2');
    expect($('#page-info').textContent.trim(), 'Подпись остаётся на второй странице').toBe('Страница 2 из 4');
  });

  it('«Назад» с кнопки возвращает на первую страницу', async () => {
    await click('#prev');
    await settle();
    expect($('#page-info').textContent.trim(), 'Вернулись').toBe('Страница 1 из 4');
    expect(titles(), 'Товары первой страницы').toEqual(expectedTitles({ page: 1 }));
  });
});
