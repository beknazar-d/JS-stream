const form = document.querySelector('#notify-form');
const result = document.querySelector('#result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const sku = String(new FormData(form).get('sku')).trim();
  result.textContent = 'Подписка на ' + sku + ' оформлена';
});
