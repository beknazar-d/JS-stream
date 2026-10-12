const list = document.querySelector('#products');
const status = document.querySelector('#status');

async function loadProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    status.textContent = 'Не удалось загрузить товары (' + response.status + ')';
    return;
  }
  const products = await response.json();
  list.textContent = '';
  for (const product of products) {
    const item = document.createElement('li');
    item.textContent = product.title + ' — ' + product.price + ' ₽';
    list.append(item);
  }
}

document.querySelector('#reload').addEventListener('click', loadProducts);
loadProducts();
