let count = 0;

function addItem() {
  count += 1;
  document.querySelector('#count').textContent = `Корзина: ${count}`;
}
document.querySelector('#add').addEventListener('click', addItem);

document.querySelector('#details').addEventListener('click', (event) => {
  event.preventDefault;
  document.querySelector('#specs-note').hidden = false;
});

document.querySelector('#q').addEventListener('keydown', (event) => {
  if (event.key === 'enter') {
    document.querySelector('#status').textContent = 'Ищем: ' + event.target.value.trim();
  }
});
