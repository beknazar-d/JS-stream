const catalog = document.querySelector('#catalog');
const cartCount = document.querySelector('#cart-count');
let count = 0;

catalog.addEventListener('click', (event) => {
  const button = event.target.closest('.add');
  if (!button) return;

  count += 1;
  cartCount.textContent = `В корзине: ${count}`;
});

function addProduct(product) {
  const card = document.createElement('li');
  card.className = 'card';
  card.dataset.id = product.id;

  const title = document.createElement('span');
  title.className = 'card__title';
  title.textContent = product.title;

  const button = document.createElement('button');
  button.className = 'add';
  button.type = 'button';
  const icon = document.createElement('span');
  icon.className = 'add__icon';
  icon.textContent = '+';
  button.append(icon, ' В корзину');

  card.append(title, button);
  catalog.append(card);
}

document.querySelector('#more').addEventListener('click', () => {
  addProduct({ id: 't2', title: 'Тостер T-2' });
});
