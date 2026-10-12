const cart = [];
const cartCount = document.querySelector('#cart-count');
const cartList = document.querySelector('#cart-list');
const clearButton = document.querySelector('#clear');

function renderCart() {
  cartCount.textContent = String(cart.length);
  cartList.textContent = cart.join(', ');
}

function addToCart(id) {
  cart.push(id);
  renderCart();
}

const firstBuy = document.querySelector('.buy');
firstBuy.addEventListener('click', (event) => {
  addToCart(event.currentTarget.dataset.id);
});

clearButton.addEventListener('click', (event) => {
  cart.length = 0;
  renderCart();
  event.currentTarget.textContent = 'Корзина пуста';
});
