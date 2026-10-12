const grid = document.querySelector('#grid');
const totalLine = document.querySelector('#total');

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

  li.append(title);
  return li;
}

async function loadProducts() {
  const response = await fetch('/api/products?page=1&limit=6');
  const data = await response.json();
  grid.replaceChildren(...data.items.map(createCard));
  totalLine.textContent = 'Найдено: ' + data.total;
}

loadProducts();
