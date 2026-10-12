import { titles, expectedTitles, settle } from './helpers.js';

describe('Пагинация', () => {
  it('на первой странице: «Страница 1 из 4», «Назад» отключена', async () => {
    await settle();
    expect($('#page-info').textContent.trim(), 'Подпись страниц').toBe('Страница 1 из 4');
    expect($('#prev').disabled, 'Кнопка «Назад» на первой странице').toBe(true);
    expect($('#next').disabled, 'Кнопка «Вперёд» на первой странице').toBe(false);
  });

  it('«Вперёд» открывает вторую страницу с товарами 7–12', async () => {
    await click('#next');
    await settle();
    expect($('#page-info').textContent.trim(), 'Подпись после перехода').toBe('Страница 2 из 4');
    expect(titles(), 'Товары второй страницы').toEqual(expectedTitles({ page: 2 }));
  });

  it('на последней странице «Вперёд» отключена', async () => {
    await click('#next');
    await settle();
    await click('#next');
    await settle();
    expect($('#page-info').textContent.trim(), 'Подпись на последней странице').toBe('Страница 4 из 4');
    expect($('#next').disabled, 'Кнопка «Вперёд» на последней странице').toBe(true);
    expect($('#prev').disabled, 'Кнопка «Назад» на последней странице').toBe(false);
    expect(titles(), 'Товары последней страницы').toEqual(expectedTitles({ page: 4 }));
  });
});
