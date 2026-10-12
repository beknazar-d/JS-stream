const list = document.querySelector('#cart-list');
const count = document.querySelector('#count');

function updateCount() {
  count.textContent = `Позиций: ${list.children.length}`;
}

list.addEventListener('click', (event) => {
  const row = event.target.closest('.cart-row');
  if (!row) return;

  row.remove();
  updateCount();
});
