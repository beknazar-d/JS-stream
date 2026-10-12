const counter = document.querySelector('#cart-count');
const addButton = document.querySelector('#add-btn');

let count = 0;

function render() {
  counter.textContent = `Корзина: ${count}`;
}

addButton.addEventListener('click', () => {
  count += 1;
  render();
});
