const ids = () => $$('#results li').map((li) => Number(li.dataset.id));
const entries = () => window.__history.entries.length;

describe('applyUrl: готовый адрес', () => {
  it('показывает подборку из адреса и не пишет в историю', () => {
    const before = entries();
    applyUrl('/catalog?category=grills&sort=price-desc&inStock=1');
    expect($('#category').value, 'Категория из адреса').toBe('grills');
    expect($('#sort').value, 'Сортировка из адреса').toBe('price-desc');
    expect($('#in-stock').checked, 'Флажок из адреса').toBe(true);
    expect(ids(), 'Гриль в наличии только один').toEqual([6]);
    expect(entries(), 'История не изменилась').toBe(before);
  });

  it('несколько сортировок', () => {
    applyUrl('/catalog?category=blenders&sort=price-asc');
    expect(ids(), 'Блендеры от дешёвых к дорогим').toEqual([8, 4, 5]);
    applyUrl('/catalog?category=grills&sort=price-desc');
    expect(ids(), 'Грили от дорогих к дешёвым').toEqual([7, 6]);
    applyUrl('/catalog?sort=price-asc');
    expect(ids().slice(0, 3), 'Три самых дешёвых товара').toEqual([3, 2, 1]);
  });

  it('мусор в адресе даёт значения по умолчанию', () => {
    applyUrl('/catalog?category=toasters&sort=cheap&inStock=0');
    expect($('#category').value, 'Категория по умолчанию').toBe('all');
    expect($('#sort').value, 'Сортировка по умолчанию').toBe('popular');
    expect($('#in-stock').checked, 'Флажок выключен').toBe(false);
    expect(ids(), 'Все товары по популярности').toEqual([3, 8, 1, 4, 2, 9, 6, 5, 7]);
  });
});

describe('Пустой результат', () => {
  it('кофемашина есть, но не в наличии: показывается подсказка', async () => {
    applyUrl('/catalog');
    expect($('#empty').hidden, 'Пока товары есть, подсказка скрыта').toBe(true);
    await type('#category', 'coffee');
    await click('#in-stock');
    expect(ids(), 'Список пуст').toEqual([]);
    expect($('#count').textContent.trim(), 'Найдено 0').toBe('0');
    expect($('#empty').hidden, 'Подсказка видна').toBe(false);
    await click('#in-stock');
    expect($('#empty').hidden, 'Без фильтра наличия подсказка скрыта').toBe(true);
  });
});

describe('popstate берёт состояние из записи', () => {
  it('запись, созданная вручную, восстанавливается при возврате', async () => {
    history.pushState({ category: 'blenders', sort: 'price-asc', inStock: false }, '', '/catalog?category=blenders&sort=price-asc');
    history.pushState({ category: 'grills', sort: 'popular', inStock: true }, '', '/catalog?category=grills&inStock=1');
    history.back();
    await waitFor(() => $('#category').value === 'blenders', 500);
    expect($('#sort').value, 'Сортировка из состояния').toBe('price-asc');
    expect($('#in-stock').checked, 'Флажок выключен').toBe(false);
    expect(ids(), 'Блендеры от дешёвых').toEqual([8, 4, 5]);
  });

  it('на странице не было необработанных ошибок', () => {
    expect(window.__pageErrors, 'Ошибки скрипта страницы').toEqual([]);
  });
});
