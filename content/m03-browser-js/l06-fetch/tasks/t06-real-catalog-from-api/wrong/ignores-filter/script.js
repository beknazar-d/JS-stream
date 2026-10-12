const list = document.querySelector('#products');
const status = document.querySelector('#status');
const onlyInStock = document.querySelector('#only-in-stock');

let products = [];

function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

function render() {
  const visible = products;
  list.textContent = '';
  for (const product of visible) {
    const card = document.createElement('li');
    card.className = 'product';

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = formatPrice(product.price);

    card.append(title, price);
    if (!product.inStock) {
      const note = document.createElement('p');
      note.className = 'note';
      note.textContent = 'Нет в наличии';
      card.append(note);
    }
    list.append(card);
  }
  status.textContent = visible.length === 0 ? 'Товаров нет' : '';
}

async function loadProducts() {
  status.textContent = 'Загрузка…';
  const response = await fetch('/api/products');
  if (!response.ok) {
    status.textContent = 'Не удалось загрузить каталог (' + response.status + ')';
    return;
  }
  products = await response.json();
  render();
}

onlyInStock.addEventListener('change', render);
document.querySelector('#reload').addEventListener('click', loadProducts);
loadProducts();
