const recentTitles = () => $$('#recent li').map((li) => li.textContent.trim());
const pressed = (n) => $(`#products li:nth-child(${n}) .fav`).getAttribute('aria-pressed');

describe('Поведение страницы сохранилось', () => {
  it('при загрузке восстановлены избранное и недавние', () => {
    expect(pressed(2), 'Блендер в избранном с прошлого визита').toBe('true');
    expect(pressed(1), 'Чайник не в избранном').toBe('false');
    expect(recentTitles(), 'Недавно смотрели: тостер, потом чайник').toEqual(['Тостер Tefal', 'Чайник Bosch']);
  });

  it('клик по .fav добавляет и убирает товар', async () => {
    await click('#products li:nth-child(1) .fav');
    expect(pressed(1), 'После клика чайник в избранном').toBe('true');
    expect(JSON.parse(localStorage.getItem('favorites')), 'В хранилище массив чисел').toEqual([2, 1]);
    await click('#products li:nth-child(2) .fav');
    expect(pressed(2), 'Повторный клик убирает блендер').toBe('false');
    expect(JSON.parse(localStorage.getItem('favorites')), 'Остался только чайник').toEqual([1]);
  });

  it('просмотр ставит товар первым без дублей', async () => {
    await click('#products li:nth-child(1) .view');
    expect(recentTitles(), 'Чайник поднялся наверх без дубля').toEqual(['Чайник Bosch', 'Тостер Tefal']);
  });
});

describe('Помощники', () => {
  it('readJson и writeJson существуют и работают в паре', () => {
    expect(typeof readJson, 'readJson объявлена на верхнем уровне').toBe('function');
    expect(typeof writeJson, 'writeJson объявлена на верхнем уровне').toBe('function');
    writeJson('probe', { a: [1, 2] });
    expect(localStorage.getItem('probe'), 'writeJson записывает JSON-строку').toBe('{"a":[1,2]}');
    expect(readJson('probe', null), 'readJson читает то, что записал writeJson').toEqual({ a: [1, 2] });
  });
});
