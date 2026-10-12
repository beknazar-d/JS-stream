const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
const entries = () => window.__history.entries.length;

describe('Загрузка и первый показ', () => {
  it('товары загружены один раз и показаны по популярности', async () => {
    await waitFor(() => ids().length === 9, 1500);
    expect(ids(), 'Без фильтров: по убыванию продаж').toEqual([3, 8, 1, 4, 2, 9, 6, 5, 7]);
    expect($('#count').textContent.trim(), 'Найдено 9').toBe('9');
    expect(api().calls.map((c) => c.path), 'Один запрос к API').toEqual(['/api/products']);
    expect(entries(), 'При загрузке запись в историю не добавлена').toBe(1);
  });
});

describe('Фильтры пишутся в историю', () => {
  it('категория', async () => {
    await type('#category', 'kettles');
    expect(ids(), 'Три чайника по популярности').toEqual([3, 1, 2]);
    expect(currentUrl(), 'Адрес').toBe('/catalog?category=kettles');
    expect(history.state, 'Состояние записи').toEqual({ category: 'kettles', sort: 'popular', inStock: false });
  });

  it('наличие и сортировка', async () => {
    await click('#in-stock');
    expect(ids(), 'Чайники в наличии по популярности').toEqual([3, 1]);
    expect(currentUrl(), 'Адрес с наличием').toBe('/catalog?category=kettles&inStock=1');
    await type('#sort', 'price-desc');
    expect(ids(), 'Чайники в наличии, сначала дорогие').toEqual([1, 3]);
    expect(currentUrl(), 'Адрес со всеми тремя фильтрами').toBe('/catalog?category=kettles&sort=price-desc&inStock=1');
    expect(entries(), 'Начальная запись и три новые').toBe(4);
    expect(api().calls, 'Новых запросов к API нет').toHaveLength(1);
  });
});

describe('Кнопка «Назад»', () => {
  it('возвращает предыдущие фильтры на странице', async () => {
    history.back();
    await waitFor(() => $('#sort').value === 'popular', 500);
    expect($('#category').value, 'Категория осталась').toBe('kettles');
    expect($('#in-stock').checked, 'Флажок остался включённым').toBe(true);
    expect(ids(), 'Список соответствует фильтрам').toEqual([3, 1]);
    expect(currentUrl(), 'Адрес предыдущей записи').toBe('/catalog?category=kettles&inStock=1');
  });

  it('второй шаг назад снимает флажок', async () => {
    history.back();
    await waitFor(() => $('#in-stock').checked === false, 500);
    expect(ids(), 'Все три чайника').toEqual([3, 1, 2]);
  });

  it('возврат к первой записи сбрасывает фильтры', async () => {
    history.back();
    await waitFor(() => $('#category').value === 'all', 500);
    expect(ids(), 'Снова все девять товаров').toHaveLength(9);
    expect(entries(), 'Переходы по истории не создали записей').toBe(4);
  });

  it('«Вперёд» работает', async () => {
    history.forward();
    await waitFor(() => $('#category').value === 'kettles', 500);
    expect(ids(), 'Снова три чайника').toEqual([3, 1, 2]);
  });
});
