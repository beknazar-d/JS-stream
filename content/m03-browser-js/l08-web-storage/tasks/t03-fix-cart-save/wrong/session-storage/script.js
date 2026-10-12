const KEY = 'cart';
let cart = JSON.parse(localStorage.getItem(KEY)) || [];

function render() {
  document.querySelector('#cart-count').textContent = cart.length;
}

function save() {
  sessionStorage.setItem(KEY, JSON.stringify(cart));
}

document.querySelector('#products').addEventListener('click', (event) => {
  const button = event.target.closest('.add');
  if (!button) return;
  const item = button.closest('li');
  cart.push({
    id: Number(item.dataset.id),
    title: item.dataset.title,
    price: Number(item.dataset.price),
  });
  save();
  render();
});

document.querySelector('#clear').addEventListener('click', () => {
  cart = [];
  save();
  render();
});

render();
