const PRODUCTS = [
  { id: 1, title: 'Чайник Bosch', category: 'kettles' },
  { id: 2, title: 'Чайник Tefal', category: 'kettles' },
  { id: 3, title: 'Блендер Philips', category: 'blenders' },
  { id: 4, title: 'Набор кофе & чай', category: 'coffee' },
  { id: 5, title: 'Кофемашина DeLonghi', category: 'coffee' },
];

function buildUrl(filters) {
  let url = '/catalog';
  const parts = [];
  if (filters.q) parts.push('q=' + filters.q);
  if (filters.category !== 'all') parts.push('category=' + filters.category);
  if (parts.length) url += '?' + parts.join('&');
  return url;
}

function parseFilters(url) {
  const filters = { q: '', category: 'all' };
  const query = url.split('?')[1];
  if (!query) return filters;
  for (const pair of query.split('&')) {
    const [key, value] = pair.split('=');
    if (key === 'q') filters.q = decodeURIComponent(value);
    if (key === 'category') filters.category = value;
  }
  return filters;
}

function render(filters) {
  const text = filters.q.toLowerCase();
  const list = document.querySelector('#results');
  list.innerHTML = '';
  for (const p of PRODUCTS) {
    const matches = (filters.category === 'all' || p.category === filters.category) && p.title.toLowerCase().includes(text);
    if (!matches) continue;
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.textContent = p.title;
    list.append(li);
  }
}

document.querySelector('#filters').addEventListener('submit', (event) => {
  event.preventDefault();
  const filters = {
    q: document.querySelector('#q').value.trim(),
    category: document.querySelector('#category').value,
  };
  history.pushState(filters, '', buildUrl(filters));
  render(filters);
});

render({ q: '', category: 'all' });
