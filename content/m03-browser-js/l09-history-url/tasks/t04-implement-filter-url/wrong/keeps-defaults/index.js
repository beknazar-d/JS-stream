export const CATEGORIES = ['all', 'kettles', 'blenders', 'grills'];
export const SORTS = ['popular', 'price-asc', 'price-desc'];
export const DEFAULTS = { category: 'all', sort: 'popular', inStock: false };

export function parseFilters(url) {
  let params;
  try {
    params = new URL(url, 'https://domoteka.example').searchParams;
  } catch {
    return { ...DEFAULTS };
  }
  const category = params.get('category');
  const sort = params.get('sort');
  return {
    category: CATEGORIES.includes(category) ? category : DEFAULTS.category,
    sort: SORTS.includes(sort) ? sort : DEFAULTS.sort,
    inStock: params.get('inStock') === '1',
  };
}

export function buildUrl(filters = {}) {
  const params = new URLSearchParams();
  params.set('category', filters.category ?? DEFAULTS.category);
  params.set('sort', filters.sort ?? DEFAULTS.sort);
  if (filters.inStock === true) {
    params.set('inStock', '1');
  }
  const query = params.toString();
  return query ? `/catalog?${query}` : '/catalog';
}
