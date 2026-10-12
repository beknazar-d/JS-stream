const PRICE = 3490;
const form = document.querySelector('#add-form');
const summary = document.querySelector('#summary');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const qty = Number(data.get('qty'));
  const gift = data.has('gift');

  let text = 'Итого: ' + PRICE * qty + ' ₽';
  if (gift) {
    text += ', подарочная упаковка';
  }
  summary.textContent = text;
});
