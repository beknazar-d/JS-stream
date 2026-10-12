const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
const queryOf = () => new URLSearchParams(currentUrl().split('?')[1] ?? '');

describe('Поведение формы', () => {
  it('обычный поиск работает как раньше', async () => {
    await type('#q', 'чайник');
    await submit('#filters');
    expect(ids(), 'Найдено два чайника').toEqual([1, 2]);
    expect(queryOf().get('q'), 'Поиск записан в адрес').toBe('чайник');
    expect(history.state, 'Состояние записи').toEqual({ q: 'чайник', category: 'all' });
  });

  it('категория попадает в адрес', async () => {
    await type('#q', '');
    await type('#category', 'blenders');
    await submit('#filters');
    expect(currentUrl(), 'Пустой поиск и категория').toBe('/catalog?category=blenders');
    expect(ids(), 'Один блендер').toEqual([3]);
  });

  it('поиск со спецсимволами читается из адреса без потерь', async () => {
    await type('#q', 'кофе & чай');
    await type('#category', 'all');
    await submit('#filters');
    expect(ids(), 'Найден набор «кофе & чай»').toEqual([4]);
    expect(queryOf().get('q'), 'Текст поиска в адресе читается обратно ровно таким же').toBe('кофе & чай');
  });
});

describe('Помощники', () => {
  it('buildUrl: чистый адрес и порядок параметров', () => {
    expect(buildUrl({ q: '', category: 'all' }), 'Без фильтров').toBe('/catalog');
    expect(new URLSearchParams(buildUrl({ q: 'тостер', category: 'kettles' }).split('?')[1]).get('q'), 'q читается обратно').toBe('тостер');
    expect(buildUrl({ q: 'тостер', category: 'kettles' }).split('?')[1].split('&').map((p) => p.split('=')[0]), 'Порядок q, category').toEqual(['q', 'category']);
  });

  it('parseFilters: значения по умолчанию', () => {
    expect(parseFilters('/catalog'), 'Адрес без параметров').toEqual({ q: '', category: 'all' });
  });
});
