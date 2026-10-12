const counter = document.querySelector('#cart-count');
const addButton = document.querySelector('#add-btn');
const clearButton = document.querySelector('#clear-btn');

let count = 0;

addButton.addEventListener('click', () => {
  count += 1;
  counter.textContent = `Корзина: ${count}`;
});

clearButton.addEventListener('click', () => {
  counter.textContent = 'Корзина: 0';
});
