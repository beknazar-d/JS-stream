const PAGE_SIZE = 6;

const grid = document.querySelector('#grid');
const totalLine = document.querySelector('#total');
const statusLine = document.querySelector('#status');
const retryButton = document.querySelector('#retry');
const reloadButton = document.querySelector('#reload');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const pageInfo = document.querySelector('#page-info');

let state = { page: 1 };
let lastPages = 1;

function formatPrice(rubles) {
  return new Intl.NumberFormat('ru-RU').format(rubles) + ' ₽';
}

function createCard(product) {
  const li = document.createElement('li');
  li.className = 'card';
  if (!product.inStock) li.classList.add('card--out');

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = product.title;

  const price = document.createElement('p');
  price.className = 'card__price';
  price.textContent = formatPrice(product.price);

  const stock = document.createElement('p');
  stock.className = 'card__stock';
  stock.textContent = product.inStock ? 'В наличии' : 'Нет в наличии';

  li.append(title, price, stock);
  return li;
}

function buildQuery() {
  const params = new URLSearchParams({ page: String(state.page), limit: String(PAGE_SIZE) });
  return params.toString();
}

function showPager() {
  pageInfo.textContent = 'Страница ' + state.page + ' из ' + lastPages;
  prevButton.disabled = state.page < 1;
  nextButton.disabled = state.page > lastPages;
}

async function loadProducts() {
  statusLine.textContent = 'Загрузка…';
  grid.setAttribute('aria-busy', 'true');
  retryButton.hidden = true;

  try {
    const response = await fetch('/api/products?' + buildQuery());
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    grid.replaceChildren(...data.items.map(createCard));
    totalLine.textContent = 'Найдено: ' + data.total;
    lastPages = data.total;
    statusLine.textContent = data.items.length === 0 ? 'Ничего не найдено' : '';
    showPager();
  } catch (error) {
    grid.replaceChildren();
    totalLine.textContent = '';
    statusLine.textContent = 'Не удалось загрузить каталог';
    retryButton.hidden = false;
  }
  grid.setAttribute('aria-busy', 'false');
}

prevButton.addEventListener('click', () => {
  state = { ...state, page: state.page - 1 };
  loadProducts();
});

nextButton.addEventListener('click', () => {
  state = { ...state, page: state.page + 1 };
  loadProducts();
});

reloadButton.addEventListener('click', () => {
  state = { ...state, page: 1 };
  loadProducts();
});
retryButton.addEventListener('click', loadProducts);

loadProducts();
