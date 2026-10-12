import { parseFilters, buildUrl, DEFAULTS } from './index.js';

describe('parseFilters', () => {
  it('разбирает полный адрес с тремя параметрами', () => {
    expect(
      parseFilters('https://domoteka.example/catalog?category=kettles&sort=price-asc&inStock=1'),
      'Полный адрес',
    ).toEqual({ category: 'kettles', sort: 'price-asc', inStock: true });
  });

  it('понимает путь и строку запроса без пути', () => {
    expect(parseFilters('/catalog?sort=price-desc'), 'Путь с параметром').toEqual({ ...DEFAULTS, sort: 'price-desc' });
    expect(parseFilters('?category=blenders'), 'Только строка запроса').toEqual({ ...DEFAULTS, category: 'blenders' });
  });

  it('пустой адрес и адрес без параметров дают значения по умолчанию', () => {
    expect(parseFilters(''), 'Пустая строка').toEqual(DEFAULTS);
    expect(parseFilters('/catalog'), 'Адрес без параметров').toEqual(DEFAULTS);
  });
});

describe('buildUrl', () => {
  it('собирает адрес в порядке category, sort, inStock', () => {
    expect(buildUrl({ category: 'kettles', sort: 'price-asc', inStock: true }), 'Все три фильтра').toBe(
      '/catalog?category=kettles&sort=price-asc&inStock=1',
    );
  });

  it('значения по умолчанию в адрес не попадают', () => {
    expect(buildUrl(DEFAULTS), 'Фильтры по умолчанию').toBe('/catalog');
    expect(buildUrl({ category: 'grills', sort: 'popular', inStock: false }), 'Только категория').toBe('/catalog?category=grills');
  });
});
