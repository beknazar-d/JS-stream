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
const form = document.querySelector('#filters');
const categorySelect = document.querySelector('#category');
const sortSelect = document.querySelector('#sort');
const inStockBox = document.querySelector('#in-stock');

let products = [];
let current = { ...DEFAULTS };

function readControls() {
  return { category: categorySelect.value, sort: sortSelect.value, inStock: inStockBox.checked };
}

function showControls(filters) {
  categorySelect.value = filters.category;
  sortSelect.value = filters.sort;
  inStockBox.checked = filters.inStock;
}

function visibleProducts(filters) {
  const items = products.filter(
    (p) => (filters.category === 'all' || p.category === filters.category) && (!filters.inStock || p.stock > 0),
  );
  if (filters.sort === 'price-asc') return [...items].sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-desc') return [...items].sort((a, b) => b.price - a.price);
  return [...items].sort((a, b) => b.sold - a.sold);
}

function render(filters) {
  const items = visibleProducts(filters);
  const list = document.querySelector('#results');
  list.innerHTML = '';
  for (const p of items) {
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.textContent = `${p.title}, ${p.price} ₽`;
    list.append(li);
  }
  document.querySelector('#count').textContent = items.length;
  document.querySelector('#empty').hidden = items.length > 0;
}

// Состояние → страница. В историю ничего не пишет.
function show(filters) {
  current = filters;
  showControls(filters);
  render(filters);
}

function applyUrl(url) {
  show(parseFilters(url));
}

form.addEventListener('change', () => {
  current = readControls();
  render(current);
  history.pushState(current, '', buildUrl(current));
});

window.addEventListener('popstate', (event) => {
  show(event.state ?? { ...DEFAULTS });
});

async function loadProducts() {
  const response = await fetch('/api/products');
  products = await response.json();
  render(current);
}

applyUrl(location.pathname + location.search);
loadProducts();
