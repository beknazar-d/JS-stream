// ---- Готово: адрес и фильтры (из предыдущих заданий) ----
const CATEGORIES = ['all', 'kettles', 'blenders', 'grills', 'coffee'];
const SORTS = ['popular', 'price-asc', 'price-desc'];
const DEFAULTS = { category: 'all', sort: 'popular', inStock: false };

function parseFilters(url) {
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

function buildUrl(filters) {
  const params = new URLSearchParams();
  if (filters.category !== DEFAULTS.category) params.set('category', filters.category);
  if (filters.sort !== DEFAULTS.sort) params.set('sort', filters.sort);
  if (filters.inStock) params.set('inStock', '1');
  const query = params.toString();
  return query ? '/catalog?' + query : '/catalog';
}

// ---- Ваш код ----
// 1. Загрузить товары: GET /api/products. Поля: id, title, category, price, stock, sold.
// 2. render(filters): отфильтровать, отсортировать, показать в #results, обновить #count и #empty.
// 3. Читать и показывать элементы управления: #category, #sort, #in-stock.
// 4. applyUrl(url): показать состояние по адресу, без записи в историю.
// 5. Изменение фильтров: pushState(filters, '', buildUrl(filters)).
// 6. popstate: показать event.state (или значения по умолчанию, если state равен null).

// В настоящем браузере при загрузке вызывают applyUrl(location.pathname + location.search).
