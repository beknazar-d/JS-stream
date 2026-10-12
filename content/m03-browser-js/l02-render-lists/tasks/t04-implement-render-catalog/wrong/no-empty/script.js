function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

const list = document.querySelector('.catalog');
const template = document.querySelector('#card-template');

function renderCatalog(products) {
  list.replaceChildren();

  for (const product of products) {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector('.card');

    card.dataset.id = product.id;
    card.querySelector('.card__title').textContent = product.title;
    card.querySelector('.card__price').textContent = formatPrice(product.price);

    const isOut = product.stock === 0;
    card.classList.toggle('card--out', isOut);
    card.querySelector('.card__buy').disabled = isOut;

    list.append(fragment);
  }
}

renderCatalog([
  { id: 'k200', title: 'Чайник K-200', price: 2990, stock: 12 },
  { id: 'b50', title: 'Блендер B-50', price: 4990, stock: 0 },
  { id: 't2', title: 'Тостер T-2', price: 2190, stock: 4 },
]);
