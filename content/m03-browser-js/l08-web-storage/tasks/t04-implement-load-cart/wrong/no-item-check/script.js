const CART_KEY = 'cart';

function loadCart() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(CART_KEY));
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  return data;
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderBadge() {
  const total = loadCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelector('#cart-count').textContent = total;
}

renderBadge();
