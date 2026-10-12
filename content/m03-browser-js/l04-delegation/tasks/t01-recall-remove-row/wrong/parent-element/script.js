const list = document.querySelector('#cart-list');
const count = document.querySelector('#count');

function updateCount() {
  count.textContent = `Позиций: ${list.children.length}`;
}

list.addEventListener('click', (event) => {
  if (!event.target.closest('.remove')) return;

  event.target.parentElement.remove();
  updateCount();
});
