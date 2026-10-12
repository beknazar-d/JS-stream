const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
const entries = () => window.__history.entries.length;

describe('Фильтры и история', () => {
  it('при загрузке в историю ничего не добавлено', () => {
    expect(entries(), 'Только начальная запись').toBe(1);
    expect(ids(), 'Без фильтров показаны все пять товаров').toEqual([1, 2, 3, 4, 5]);
  });

  it('каждый выбор фильтра добавляет одну запись', async () => {
    await type('#category', 'kettles');
    expect(currentUrl(), 'Адрес после выбора чайников').toBe('/catalog?category=kettles');
    expect(ids(), 'Показаны два чайника').toEqual([1, 2]);
    await click('#in-stock');
    expect(currentUrl(), 'Адрес после флажка').toBe('/catalog?category=kettles&inStock=1');
    expect(history.state, 'Состояние записи').toEqual({ category: 'kettles', inStock: true });
    expect(ids(), 'Только чайники в наличии').toEqual([1]);
    expect(entries(), 'Начальная запись и две новые').toBe(3);
  });

  it('«Назад» восстанавливает фильтры на странице', async () => {
    history.back();
    await waitFor(() => $('#in-stock').checked === false, 500);
    expect($('#category').value, 'Категория осталась «Чайники»').toBe('kettles');
    expect(ids(), 'Снова два чайника').toEqual([1, 2]);
    expect(currentUrl(), 'Адрес предыдущей записи').toBe('/catalog?category=kettles');
  });

  it('«Вперёд» возвращает следующее состояние', async () => {
    history.forward();
    await waitFor(() => $('#in-stock').checked === true, 500);
    expect(ids(), 'Чайники в наличии').toEqual([1]);
    expect(currentUrl(), 'Адрес последней записи').toBe('/catalog?category=kettles&inStock=1');
    expect(entries(), 'Возврат не создал записей').toBe(3);
  });
});
