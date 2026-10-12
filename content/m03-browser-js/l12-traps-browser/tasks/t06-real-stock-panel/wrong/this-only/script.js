const initialItems = [
  { name: 'Электрический чайник Domo K-17', qty: 3, price: 2490 },
  { name: 'Тостер Vento T-2', qty: 2, price: 1990 },
];

const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const qtyInput = document.querySelector('#qty');
const priceInput = document.querySelector('#price');
const formError = document.querySelector('#form-error');
const rows = document.querySelector('#rows');
const totalQty = document.querySelector('#total-qty');
const totalSum = document.querySelector('#total-sum');

const items = [];

function formatMoney(rubles) {
  return new Intl.NumberFormat('ru-RU').format(rubles) + ' ₽';
}

function rowHtml(item) {
  return (
    '<tr>' +
    '<td class="name">' + item.name + '</td>' +
    '<td class="qty">' + item.qty + '</td>' +
    '<td class="price">' + formatMoney(item.price) + '</td>' +
    '<td class="sum">' + formatMoney(item.qty * item.price) + '</td>' +
    '<td><button type="button" class="del">Удалить</button></td>' +
    '</tr>'
  );
}

function updateTotals() {
  let qty = 0;
  let sum = 0;
  for (const item of items) {
    qty += item.qty;
    sum += item.qty * item.price;
  }
  totalQty.textContent = qty;
  totalSum.textContent = formatMoney(sum);
}

function addRow(item) {
  items.push(item);
  rows.innerHTML += rowHtml(item);

  const button = rows.lastElementChild.querySelector('.del');
  button.addEventListener('click', (event) => {
    const row = event.currentTarget.closest('tr');
    const index = Array.from(rows.children).indexOf(row);
    items.splice(index, 1);
    row.remove();
    updateTotals();
  });

  updateTotals();
}

initialItems.forEach(addRow);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addRow({
    name: nameInput.value,
    qty: qtyInput.value,
    price: priceInput.value,
  });
  form.reset();
});
