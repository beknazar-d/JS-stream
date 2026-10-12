const list = document.querySelector('#products');

async function loadProducts() {
  const response = await fetch('/api/products');
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
