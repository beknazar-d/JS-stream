const ids = () => $$('#results li').map((li) => Number(li.dataset.id));

describe('Возврат к началу истории', () => {
  it('две записи назад: фильтры сброшены, ошибок нет', async () => {
    history.back();
    await waitFor(() => $('#in-stock').checked === false, 500);
    history.back();
    await waitFor(() => $('#category').value === 'all', 500);
    expect(ids(), 'Без фильтров снова пять товаров').toEqual([1, 2, 3, 4, 5]);
    expect($('#count').textContent, 'Счётчик показывает 5').toBe('5');
    expect(window.__pageErrors, 'Ошибок скрипта нет').toEqual([]);
  });

  it('можно пройти вперёд по всей цепочке', async () => {
    history.forward();
    await waitFor(() => $('#category').value === 'kettles', 500);
    history.forward();
    await waitFor(() => $('#in-stock').checked === true, 500);
    expect(ids(), 'Чайники в наличии').toEqual([1]);
  });

  it('новый выбор после «Назад» отбрасывает «будущее»', async () => {
    history.back();
    await waitFor(() => $('#in-stock').checked === false, 500);
    await type('#category', 'blenders');
    expect(currentUrl(), 'Адрес нового выбора').toBe('/catalog?category=blenders');
    expect(window.__history.entries.length, 'Начальная, чайники, блендеры').toBe(3);
    expect(ids(), 'Два блендера').toEqual([3, 4]);
  });
});
