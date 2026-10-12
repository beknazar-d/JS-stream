const list = document.querySelector('#cart-list');
const count = document.querySelector('#count');

function updateCount() {
  count.textContent = `Позиций: ${list.children.length}`;
}

for (const button of document.querySelectorAll('.remove')) {
  button.addEventListener('click', (event) => {
    event.currentTarget.closest('.cart-row').remove();
    updateCount();
  });
}
