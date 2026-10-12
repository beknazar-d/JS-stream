function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

const row = document.querySelector('.cart-row');
const input = row.querySelector('.qty');
const total = row.querySelector('.line-total');
const price = Number(row.dataset.price);

// Подключите обработчики input, change и кнопки плюс и минус.
