function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

const MIN = 1;
const MAX = 99;

const row = document.querySelector('.cart-row');
const input = row.querySelector('.qty');
const total = row.querySelector('.line-total');
const price = Number(row.dataset.price);

function parseQty(value) {
  const number = Math.trunc(Number(value));
  if (Number.isNaN(number) || number < MIN) return MIN;
  if (number > MAX) return MAX;
  return number;
}

function setQty(qty) {
  input.value = String(qty);
  total.textContent = formatPrice(price * qty);
}

input.addEventListener('change', () => {
  setQty(parseQty(input.value));
});

row.querySelector('.plus').addEventListener('click', () => {
  setQty(Math.min(MAX, parseQty(input.value) + 1));
});

row.querySelector('.minus').addEventListener('click', () => {
  setQty(Math.max(MIN, parseQty(input.value) - 1));
});
