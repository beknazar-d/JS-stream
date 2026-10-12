const form = document.querySelector('#notify-form');
const result = document.querySelector('#result');

form.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  const sku = String(new FormData(form).get('sku')).trim();
  if (sku === '') {
    result.textContent = 'Введите артикул';
    return;
  }
  result.textContent = 'Подписка на ' + sku + ' оформлена';
});
