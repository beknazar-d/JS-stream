const list = document.querySelector('#cart-list');
const count = document.querySelector('#count');

function updateCount() {
  count.textContent = `Позиций: ${list.children.length}`;
}

list.addEventListener('click', (event) => {
  const button = event.target.closest('.remove');
  if (!button) return;

  button.closest('.cart-row').remove();
  updateCount();
});
