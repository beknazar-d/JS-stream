const visible = () => $$('#results li').filter((li) => !li.hidden).map((li) => li.textContent.trim());

describe('Живой поиск', () => {
  it('набор текста скрывает неподходящие товары', async () => {
    await type('#q', 'чай');
    expect(visible(), 'Видимые товары по запросу «чай»').toEqual(['Чайник K-200', 'Чайник стеклянный G-10']);
  });

  it('регистр не важен', async () => {
    await type('#q', 'БЛЕН');
    expect(visible(), 'Видимые товары по запросу «БЛЕН»').toEqual(['Блендер B-50']);
  });

  it('статус показывает число найденных', async () => {
    await type('#q', 'чай');
    expect($('#status').textContent.trim(), 'Статус при двух совпадениях').toBe('Найдено: 2');
  });

  it('пустой запрос возвращает все товары', async () => {
    await type('#q', 'чай');
    await type('#q', '');
    expect(visible(), 'Все восемь товаров').toHaveLength(8);
    expect($('#status').textContent.trim(), 'Статус').toBe('Найдено: 8');
  });

  it('при пустом результате показано сообщение', async () => {
    await type('#q', 'нет такого');
    expect(visible(), 'Нет видимых товаров').toHaveLength(0);
    expect($('.empty').hidden, 'Сообщение «Ничего не найдено» показано').toBe(false);
    expect($('#status').textContent.trim(), 'Статус').toBe('Найдено: 0');
    await type('#q', 'тостер');
    expect($('.empty').hidden, 'Сообщение скрыто, когда результат есть').toBe(true);
  });

  it('Escape очищает поле и показывает все товары', async () => {
    await type('#q', 'фен');
    await press('#q', 'Escape');
    expect($('#q').value, 'Поле очищено').toBe('');
    expect(visible(), 'Все товары снова видны').toHaveLength(8);
  });
});
