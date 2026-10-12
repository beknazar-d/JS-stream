const roundtrip = (q, category = 'all') => parseFilters(buildUrl({ q, category }));

describe('Круг построения и разбора', () => {
  it('спецсимволы в поиске не теряются', () => {
    for (const q of ['кофе & чай', 'a=b', '50% скидка', 'товар #1', '1+1', 'a b  c', 'ёлка?', 'a&b=c&d']) {
      expect(roundtrip(q), `Поиск «${q}»`).toEqual({ q, category: 'all' });
    }
  });

  it('категория проходит круг вместе с поиском', () => {
    expect(roundtrip('чайник & кофе', 'kettles'), 'Поиск и категория').toEqual({ q: 'чайник & кофе', category: 'kettles' });
  });

  it('читает адрес, где пробел записан плюсом или %20', () => {
    expect(parseFilters('/catalog?q=a+b'), 'Плюс как пробел').toEqual({ q: 'a b', category: 'all' });
    expect(parseFilters('/catalog?q=a%20b&category=coffee'), 'Процентная запись').toEqual({ q: 'a b', category: 'coffee' });
  });

  it('пустой поиск не попадает в адрес', () => {
    expect(buildUrl({ q: '', category: 'coffee' }), 'Только категория').toBe('/catalog?category=coffee');
    expect(buildUrl({ q: 'x', category: 'all' }).includes('category'), 'Категория по умолчанию не пишется').toBe(false);
  });
});

describe('Нет ручной возни со строками', () => {
  const source = () =>
    document.querySelector('script[data-file="script.js"]').textContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');

  it('в коде используется URLSearchParams', () => {
    expect(source().includes('URLSearchParams'), 'Нужен URLSearchParams').toBe(true);
  });

  it('нет ручного разбиения по амперсанду', () => {
    expect(/split\(\s*['"]&['"]\s*\)/.test(source()), 'Вызов split по & убирается').toBe(false);
  });
});
