const PRICE = 3490;
const form = document.querySelector('#add-form');
const summary = document.querySelector('#summary');

form.addEventListener('submit', (event) => {
  const data = new FormData(form);
  const qty = Number(data.get('qty'));
  const gift = data.get('gift') === true;

  let text = 'Итого: ' + PRICE * qty + ' ₽';
  if (gift) {
    text += ', подарочная упаковка';
  }
  summary.textContent = text;
});
