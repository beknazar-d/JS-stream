const list = document.querySelector('#products');
const status = document.querySelector('#status');

async function loadProducts() {
  const response = fetch('/api/products');
  const products = await response.json();
  for (const product of products) {
    const item = document.createElement('li');
    item.textContent = product.title + ' — ' + product.price + ' ₽';
    list.append(item);
  }
}

document.querySelector('#reload').addEventListener('click', loadProducts);
loadProducts();
