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

document.querySelectorAll('.buy').forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(this.dataset.id);
  });
});

clearButton.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
  this.textContent = 'Корзина пуста';
});
