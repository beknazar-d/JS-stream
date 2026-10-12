function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderCatalog(products) {
  // Постройте карточки из шаблона #card-template.
}

renderCatalog([
  { id: 'k200', title: 'Чайник K-200', price: 2990, stock: 12 },
  { id: 'b50', title: 'Блендер B-50', price: 4990, stock: 0 },
  { id: 't2', title: 'Тостер T-2', price: 2190, stock: 4 },
]);
