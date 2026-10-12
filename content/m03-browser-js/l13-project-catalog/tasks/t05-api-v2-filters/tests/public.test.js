import { cards, titles, priceOf, expectedTitles, reference, settle } from './helpers.js';

describe('Формат API версии 2', () => {
  it('карточки строятся из data, итог берётся из meta', async () => {
    await settle();
    expect(titles(), 'Первая страница каталога').toEqual(expectedTitles());
    expect($('#total').textContent.trim(), 'Строка с общим числом').toBe('Найдено: 24');
    expect($('#page-info').textContent.trim(), 'Подпись страниц').toBe('Страница 1 из 4');
  });

  it('цена в рублях, наличие по stock', async () => {
    await settle();
    expect(cards().map(priceOf), 'Цены карточек в рублях').toEqual([2990, 2490, 1990, 3200, 18900, 5490]);
    const toaster = cards()[2];
    expect(toaster.querySelector('.card__stock').textContent.trim(), 'Остаток 0 — нет в наличии').toBe('Нет в наличии');
    expect(toaster.classList.contains('card--out'), 'Класс card--out').toBe(true);
    expect(cards()[0].querySelector('.card__stock').textContent.trim(), 'Остаток 12 — в наличии').toBe('В наличии');
  });
});

describe('Категория и сортировка', () => {
  it('категория «Кухня»: запрос с category=kitchen, восемь товаров на двух страницах', async () => {
    const before = shopServer.calls.length;
    await type('#category', 'kitchen');
    await settle();
    const call = shopServer.calls[shopServer.calls.length - 1];
    expect(shopServer.calls.length - before, 'Один запрос').toBe(1);
    expect(call.category, 'Параметр category').toBe('kitchen');
    expect($('#total').textContent.trim(), 'Товаров в категории').toBe('Найдено: 8');
    expect($('#page-info').textContent.trim(), 'Страниц в категории').toBe('Страница 1 из 2');
    expect(titles(), 'Товары категории').toEqual(expectedTitles({ category: 'kitchen' }));
  });

  it('сортировка «Сначала дешёвые» в категории', async () => {
    await type('#sort', 'price-asc');
    await settle();
    expect(shopServer.calls[shopServer.calls.length - 1].sort, 'Параметр sort').toBe('price-asc');
    expect(titles(), 'Дешёвые кухонные товары первыми').toEqual(expectedTitles({ category: 'kitchen', sort: 'price-asc' }));
  });

  it('«Все категории» и «По популярности» не добавляют параметры', async () => {
    await type('#category', '');
    await type('#sort', 'popular');
    await settle();
    const call = shopServer.calls[shopServer.calls.length - 1];
    expect('category' in call, 'Пустая категория не отправляется').toBe(false);
    expect('sort' in call, 'Сортировка по умолчанию не отправляется').toBe(false);
    expect(titles(), 'Каталог целиком').toEqual(expectedTitles());
  });
});
