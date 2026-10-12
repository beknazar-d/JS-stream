const counter = document.querySelector('#cart-count');
const addButton = document.querySelector('#add-btn');
const clearButton = document.querySelector('#clear-btn');

let count = 0;

function addItem() {
  count += 1;
  counter.textContent = `Корзина: ${count}`;
}

function clearAll() {
  count = 0;
  counter.textContent = `Корзина: ${count}`;
}

addButton.addEventListener('click', addItem());
clearButton.addEventListener('click', clearAll);
