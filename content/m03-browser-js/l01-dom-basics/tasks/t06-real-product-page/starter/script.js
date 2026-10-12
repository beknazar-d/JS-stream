function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderProduct(product) {
  // Заполните страницу данными товара.
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
