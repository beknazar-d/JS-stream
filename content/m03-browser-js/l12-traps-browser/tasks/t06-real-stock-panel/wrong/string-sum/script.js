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

function createCell(className, text) {
  const td = document.createElement('td');
  td.className = className;
  td.textContent = text;
  return td;
}

function createRow(item) {
  const tr = document.createElement('tr');
  const actions = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'del';
  button.textContent = 'Удалить';
  actions.append(button);

  tr.append(
    createCell('name', item.name),
    createCell('qty', String(item.qty)),
    createCell('price', formatMoney(item.price)),
    createCell('sum', formatMoney(item.qty * item.price)),
    actions,
  );
  return tr;
}

function updateTotals() {
  let qty = 0;
  let sum = 0;
  for (const item of items) {
    qty += item.qty;
    sum += item.qty * item.price;
  }
  totalQty.textContent = String(qty);
  totalSum.textContent = formatMoney(sum);
}

function addRow(item) {
  items.push(item);
  rows.append(createRow(item));
  updateTotals();
}

// Один обработчик на tbody: он работает и для старых, и для новых строк.
rows.addEventListener('click', (event) => {
  const button = event.target.closest('.del');
  if (!button) return;
  const row = button.closest('tr');
  const index = Array.from(rows.children).indexOf(row);
  items.splice(index, 1);
  row.remove();
  updateTotals();
});

// Текст из поля в число; пусто или не число — null.
function parseNumber(text) {
  const clean = text.trim();
  if (clean === '') return null;
  const value = Number(clean);
  return Number.isFinite(value) ? value : null;
}

initialItems.forEach(addRow);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const qty = parseNumber(qtyInput.value);
  const price = parseNumber(priceInput.value);

  if (name === '' || qty === null || price === null) {
    formError.textContent = 'Заполните название и укажите количество и цену числами';
    return;
  }

  formError.textContent = '';
  addRow({ name, qty: qtyInput.value.trim(), price: priceInput.value.trim() });
  form.reset();
  nameInput.focus();
});
