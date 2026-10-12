function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderProduct(product) {
  document.title = `${product.title} — Домотека`;
  document.querySelector('.p-title').textContent = product.title;
  document.querySelector('.crumb-current').textContent = product.title;
  document.querySelector('.p-price').textContent = formatPrice(product.price);

  const hasDiscount = product.oldPrice > product.price;
  const oldPrice = document.querySelector('.p-old-price');
  const discount = document.querySelector('.p-discount');
  oldPrice.hidden = !hasDiscount;
  discount.hidden = !hasDiscount;
  if (hasDiscount) {
    const percent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    oldPrice.textContent = formatPrice(product.oldPrice);
    discount.textContent = `Скидка ${percent}%`;
  } else {
    oldPrice.textContent = '';
    discount.textContent = '';
  }

  const inStock = product.stock > 0;
  const stock = document.querySelector('.p-stock');
  stock.textContent = inStock ? 'В наличии' : 'Нет в наличии';
  stock.classList.toggle('p-stock--ok', inStock);
  stock.classList.toggle('p-stock--out', !inStock);

  const button = document.querySelector('.p-buy');
  button.disabled = !inStock;
  button.dataset.productId = product.id;

  const photo = document.querySelector('.p-photo');
  photo.src = product.image;
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
