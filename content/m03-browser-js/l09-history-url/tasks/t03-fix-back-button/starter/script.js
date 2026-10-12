const PRODUCTS = [
  { id: 1, title: 'Чайник Bosch', category: 'kettles', stock: 12 },
  { id: 2, title: 'Чайник Tefal', category: 'kettles', stock: 0 },
  { id: 3, title: 'Блендер Philips', category: 'blenders', stock: 7 },
  { id: 4, title: 'Блендер Braun', category: 'blenders', stock: 0 },
  { id: 5, title: 'Тостер Tefal', category: 'toasters', stock: 4 },
];
const DEFAULTS = { category: 'all', inStock: false };

const categorySelect = document.querySelector('#category');
const inStockBox = document.querySelector('#in-stock');

function buildUrl(filters) {
  const params = new URLSearchParams();
  if (filters.category !== DEFAULTS.category) params.set('category', filters.category);
  if (filters.inStock) params.set('inStock', '1');
  const query = params.toString();
  return '/catalog' + (query ? '?' + query : '');
}

function readControls() {
  return { category: categorySelect.value, inStock: inStockBox.checked };
}

function showControls(filters) {
  categorySelect.value = filters.category;
  inStockBox.checked = filters.inStock;
}

function render(filters) {
  const items = PRODUCTS.filter(
    (p) => (filters.category === 'all' || p.category === filters.category) && (!filters.inStock || p.stock > 0),
  );
  const list = document.querySelector('#results');
  list.innerHTML = '';
  for (const p of items) {
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.textContent = p.title;
    list.append(li);
  }
  document.querySelector('#count').textContent = items.length;
}

function applyFilters(filters) {
  render(filters);
  history.pushState(filters, '', buildUrl(filters));
}

categorySelect.addEventListener('change', () => applyFilters(readControls()));
inStockBox.addEventListener('change', () => applyFilters(readControls()));

window.addEventListener('popstate', (event) => {
  const filters = event.state || DEFAULTS;
  showControls(filters);
  applyFilters(filters);
});

render(readControls());
