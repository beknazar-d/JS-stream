function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderOrder(order) {
  // Заполните страницу данными заказа.
}

renderOrder({
  customer: 'Мария Иванова',
  address: 'Москва, ул. Лесная, 5',
  items: [
    { title: 'Чайник K-200', qty: 1, price: 2990 },
    { title: 'Блендер B-50', qty: 2, price: 4990 },
  ],
  promoCode: 'DOM10',
});
