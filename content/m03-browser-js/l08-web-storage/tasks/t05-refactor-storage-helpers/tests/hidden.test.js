const recentTitles = () => $$('#recent li').map((li) => li.textContent.trim());

describe('readJson: запасное значение', () => {
  it('нет ключа: возвращается fallback', () => {
    localStorage.removeItem('nothing');
    expect(readJson('nothing', []), 'Нет ключа, запасное значение — пустой массив').toEqual([]);
    expect(readJson('nothing', 5), 'Нет ключа, запасное значение — число 5').toBe(5);
  });

  it('битый JSON: возвращается fallback, ошибки нет', () => {
    localStorage.setItem('broken', '{oops');
    expect(readJson('broken', ['запас']), 'Повреждённые данные').toEqual(['запас']);
    localStorage.setItem('broken', '[object Object]');
    expect(readJson('broken', 0), 'Результат записи без JSON.stringify').toBe(0);
  });

  it('в хранилище лежит false или 0: это значения, а не отсутствие', () => {
    localStorage.setItem('flag', 'false');
    localStorage.setItem('zero', '0');
    expect(readJson('flag', true), 'false сохранённый — это false').toBe(false);
    expect(readJson('zero', 9), '0 сохранённый — это 0').toBe(0);
  });
});

describe('Поведение: тонкости', () => {
  it('в недавних не больше трёх товаров', async () => {
    await click('#products li:nth-child(2) .view');
    await click('#products li:nth-child(3) .view');
    await click('#products li:nth-child(4) .view');
    expect(recentTitles(), 'Четвёртый просмотр вытесняет самый старый').toEqual(['Кофемашина DeLonghi', 'Тостер Tefal', 'Блендер Philips']);
    expect(JSON.parse(localStorage.getItem('recent')), 'В хранилище те же идентификаторы').toEqual([4, 3, 2]);
  });
});

describe('Нет дублирования', () => {
  const source = () => {
    const script = document.querySelector('script[data-file="script.js"]');
    return script.textContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
  };
  const count = (text) => source().split(text).length - 1;

  it('JSON.parse вызывается в одном месте', () => {
    expect(count('JSON.parse('), 'Число вызовов JSON.parse в script.js').toBe(1);
  });

  it('getItem и setItem вызываются в одном месте', () => {
    expect(count('localStorage.getItem('), 'Число вызовов localStorage.getItem').toBe(1);
    expect(count('localStorage.setItem('), 'Число вызовов localStorage.setItem').toBe(1);
  });
});
