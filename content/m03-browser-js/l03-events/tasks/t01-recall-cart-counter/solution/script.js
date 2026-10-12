const counter = document.querySelector('#cart-count');
const addButton = document.querySelector('#add-btn');
const clearButton = document.querySelector('#clear-btn');

let count = 0;

function render() {
  counter.textContent = `Корзина: ${count}`;
}

addButton.addEventListener('click', () => {
  count += 1;
  render();
});

clearButton.addEventListener('click', () => {
  count = 0;
  render();
});
