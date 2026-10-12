const list = document.querySelector('#products');

async function checkStock(card) {
  const output = card.querySelector('.stock');
  const sku = card.dataset.sku;
  const response = await fetch('/api/stock?sku=' + encodeURIComponent(sku));
  const data = await response.json();
  output.textContent = data.left > 0 ? 'В наличии: ' + data.left + ' шт.' : 'Нет в наличии';
}

list.addEventListener('click', (event) => {
  const button = event.target.closest('.check');
  if (button) checkStock(button.closest('.card'));
});
