import { parseFilters, buildUrl, DEFAULTS, CATEGORIES, SORTS } from './index.js';

describe('parseFilters: мусорные адреса', () => {
  it('недопустимые значения заменяются значениями по умолчанию', () => {
    expect(parseFilters('/catalog?category=toaster&sort=cheap'), 'Опечатки в значениях').toEqual(DEFAULTS);
    expect(parseFilters('/catalog?category=Kettles'), 'Регистр значения важен').toEqual(DEFAULTS);
    expect(parseFilters('/catalog?category=&sort='), 'Пустые значения').toEqual(DEFAULTS);
  });

  it('inStock истинно только при единице', () => {
    expect(parseFilters('?inStock=1').inStock, 'inStock=1').toBe(true);
    expect(parseFilters('?inStock=0').inStock, 'inStock=0').toBe(false);
    expect(parseFilters('?inStock=true').inStock, 'inStock=true не считается включённым').toBe(false);
    expect(parseFilters('?inStock').inStock, 'inStock без значения').toBe(false);
  });

  it('лишние параметры, якорь и повторы не мешают', () => {
    expect(parseFilters('/catalog?utm_source=mail&category=blenders#reviews'), 'Метка рассылки и якорь').toEqual({
      ...DEFAULTS,
      category: 'blenders',
    });
    expect(parseFilters('?sort=price-asc&sort=price-desc').sort, 'При повторе берётся первое значение').toBe('price-asc');
  });

  it('функция не падает на мусоре и не возвращает общий объект', () => {
    expect(() => parseFilters('http://')).not.toThrow();
    expect(parseFilters('http://'), 'Сломанный адрес').toEqual(DEFAULTS);
    expect(() => parseFilters(undefined)).not.toThrow();
    const first = parseFilters('');
    first.category = 'kettles';
    expect(parseFilters('').category, 'Изменение результата не влияет на следующий вызов').toBe('all');
    expect(DEFAULTS.category, 'DEFAULTS не изменён').toBe('all');
  });

  it('понимает закодированные символы', () => {
    expect(parseFilters('?category=kettles&sort=price%2Dasc'), 'Дефис в закодированном виде').toEqual({
      ...DEFAULTS,
      category: 'kettles',
      sort: 'price-asc',
    });
  });
});

describe('buildUrl: краевые случаи', () => {
  it('неполные и недопустимые фильтры', () => {
    expect(buildUrl({}), 'Пустой объект').toBe('/catalog');
    expect(buildUrl(), 'Без аргумента').toBe('/catalog');
    expect(buildUrl({ category: 'toaster' }), 'Неизвестная категория').toBe('/catalog');
    expect(buildUrl({ sort: 'price-desc' }), 'Только сортировка').toBe('/catalog?sort=price-desc');
    expect(buildUrl({ inStock: true }), 'Только наличие').toBe('/catalog?inStock=1');
  });

  it('нестрогое истинное значение inStock не считается включённым', () => {
    expect(buildUrl({ inStock: 'yes' }), 'Строка вместо true').toBe('/catalog');
  });

  it('цикл parseFilters(buildUrl(f)) для всех сочетаний', () => {
    for (const category of CATEGORIES) {
      for (const sort of SORTS) {
        for (const inStock of [true, false]) {
          const filters = { category, sort, inStock };
          expect(parseFilters(buildUrl(filters)), `Круг для ${JSON.stringify(filters)}`).toEqual(filters);
        }
      }
    }
  });
});
