const CART_KEY = 'cart';

// Возвращает массив позиций { id, qty }. Не должна падать ни на каких данных.
function loadCart() {
  // TODO
}

// Записывает корзину в localStorage как JSON.
function saveCart(cart) {
  // TODO
}

function renderBadge() {
  const total = loadCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelector('#cart-count').textContent = total;
}

renderBadge();
