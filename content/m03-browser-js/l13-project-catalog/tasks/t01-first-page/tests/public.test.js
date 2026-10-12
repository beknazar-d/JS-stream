import { cards, titles, priceOf, reference, expectedTitles, settle } from './helpers.js';

describe('Первая страница каталога', () => {
  it('одна загрузка: GET /api/products?page=1&limit=6', async () => {
    await settle();
    expect(shopServer.calls, 'Страница должна один раз запросить каталог при загрузке').toHaveLength(1);
    expect(shopServer.calls[0].page, 'Параметр page первого запроса').toBe('1');
    expect(shopServer.calls[0].limit, 'Параметр limit первого запроса: по ТЗ шесть товаров на странице').toBe('6');
  });

  it('показаны шесть карточек в порядке сервера', async () => {
    await settle();
    expect(cards(), 'Карточек на первой странице').toHaveLength(6);
    expect(titles(), 'Названия товаров по порядку').toEqual(expectedTitles());
  });

  it('в карточке есть цена и наличие', async () => {
    await settle();
    const first = cards()[0];
    expect(priceOf(first), 'Цена первой карточки в рублях (2 990 ₽)').toBe(2990);
    expect(first.querySelector('.card__stock').textContent.trim(), 'Подпись наличия у товара с остатком').toBe('В наличии');
  });

  it('в #total общее число товаров', async () => {
    await settle();
    expect($('#total').textContent.trim(), 'Строка «Найдено: N» берёт N из ответа сервера').toBe('Найдено: ' + reference().total);
  });
});
