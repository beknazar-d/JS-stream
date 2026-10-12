const list = document.querySelector('#cart-list');
const count = document.querySelector('#count');

function updateCount() {
  count.textContent = `Позиций: ${list.children.length}`;
}

// Подключите один обработчик клика на список.
