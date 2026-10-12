function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderProduct(product) {
  document.title = `${product.title} — Домотека`;
  document.querySelector('.p-title').textContent = product.title;
  document.querySelector('.crumb-current').textContent = product.title;
  document.querySelector('.p-price').textContent = formatPrice(product.price);
}

renderProduct({
  id: 'k200',
  title: 'Чайник K-200',
  price: 2990,
  oldPrice: 3990,
  stock: 12,
  image: 'img/k200.jpg',
  imageAlt: 'Чайник K-200, вид спереди',
});
