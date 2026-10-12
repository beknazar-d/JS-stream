export const CATEGORIES = ['all', 'kettles', 'blenders', 'grills'];
export const SORTS = ['popular', 'price-asc', 'price-desc'];
export const DEFAULTS = { category: 'all', sort: 'popular', inStock: false };

// Адрес (строка) → фильтры { category, sort, inStock }.
export function parseFilters(url) {
  // TODO
}

// Фильтры → адрес вида /catalog?category=kettles&sort=price-asc&inStock=1
export function buildUrl(filters) {
  // TODO
}
