const PAGE_SIZE = 6;

const grid = document.querySelector('#grid');
const totalLine = document.querySelector('#total');
const statusLine = document.querySelector('#status');
const retryButton = document.querySelector('#retry');
const reloadButton = document.querySelector('#reload');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const sortSelect = document.querySelector('#sort');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const pageInfo = document.querySelector('#page-info');

let state = parseState(location.search);
let lastPages = 1;
let controller;

// В API версии 2 цена приходит в копейках.
function formatPrice(minor) {
  return new Intl.NumberFormat('ru-RU').format(minor / 100) + ' ₽';
}

function createCard(product) {
  const inStock = product.stock > 0;
  const li = document.createElement('li');
  li.className = 'card';
  if (!inStock) li.classList.add('card--out');

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = product.title;

  const price = document.createElement('p');
  price.className = 'card__price';
  price.textContent = formatPrice(product.priceMinor);

  const stock = document.createElement('p');
  stock.className = 'card__stock';
  stock.textContent = inStock ? 'В наличии' : 'Нет в наличии';

  li.append(title, price, stock);
  return li;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function buildQuery() {
  const params = new URLSearchParams({ page: String(state.page), limit: String(PAGE_SIZE) });
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.sort !== 'popular') params.set('sort', state.sort);
  return params.toString();
}

function showPager() {
  pageInfo.textContent = 'Страница ' + state.page + ' из ' + lastPages;
  prevButton.disabled = state.page <= 1;
  nextButton.disabled = state.page >= lastPages;
}

async function loadProducts() {
  if (controller) controller.abort();
  controller = new AbortController();
  const { signal } = controller;

  statusLine.textContent = 'Загрузка…';
  grid.setAttribute('aria-busy', 'true');
  retryButton.hidden = true;

  try {
    const response = await fetch('/api/products?' + buildQuery(), { signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const { data, meta } = await response.json();
    grid.replaceChildren(...data.map(createCard));
    totalLine.textContent = 'Найдено: ' + meta.total;
    lastPages = meta.pages;
    statusLine.textContent = data.length === 0 ? 'Ничего не найдено' : '';
    showPager();
  } catch (error) {
    if (error.name === 'AbortError') return;
    grid.replaceChildren();
    totalLine.textContent = '';
    statusLine.textContent = 'Не удалось загрузить каталог';
    retryButton.hidden = false;
  }
  grid.setAttribute('aria-busy', 'false');
}

// Применяет новые фильтры: обновляет адрес (новая запись в истории) и грузит данные.
function changeState(patch) {
  const next = { ...state, ...patch };
  if (buildSearch(next) === buildSearch(state)) return;
  state = next;
  history.pushState(state, '', buildSearch(state) || location.pathname);
  loadProducts();
}

// Показывает в полях текущее состояние (нужно после «Назад» и при открытии по ссылке).
function showControls() {
  searchInput.value = state.q;
  categorySelect.value = state.category;
  sortSelect.value = state.sort;
}

const debouncedSearch = debounce((text) => changeState({ q: text, page: 1 }), 300);

searchInput.addEventListener('input', () => {
  debouncedSearch(searchInput.value.trim());
});

categorySelect.addEventListener('change', () => {
  changeState({ category: categorySelect.value, page: 1 });
});

sortSelect.addEventListener('change', () => {
  changeState({ sort: sortSelect.value, page: 1 });
});

prevButton.addEventListener('click', () => {
  if (state.page > 1) changeState({ page: state.page - 1 });
});

nextButton.addEventListener('click', () => {
  if (state.page < lastPages) changeState({ page: state.page + 1 });
});

reloadButton.addEventListener('click', loadProducts);
retryButton.addEventListener('click', loadProducts);

// «Назад» и «Вперёд»: берём состояние из записи истории, запись не добавляем.


// Первая запись истории тоже хранит состояние, чтобы «Назад» к ней работал.
history.replaceState(state, '', buildSearch(state) || location.pathname);
showControls();
loadProducts();
