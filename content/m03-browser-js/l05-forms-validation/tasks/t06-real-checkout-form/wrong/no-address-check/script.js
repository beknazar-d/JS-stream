const METHODS = { delivery: 'Доставка', pickup: 'Самовывоз' };
const FIELDS = ['name', 'phone', 'address'];
const form = document.querySelector('#checkout-form');
const summary = document.querySelector('#summary');

function readData() {
  const data = Object.fromEntries(new FormData(form));
  for (const key of Object.keys(data)) data[key] = String(data[key]).trim();
  return data;
}

function validate(data) {
  const errors = {};
  if (data.name === '') errors.name = 'Введите имя';
  const digits = data.phone.replace(/[\s()-]/g, '');
  if (data.phone === '') errors.phone = 'Введите телефон, курьер позвонит перед доставкой';
  else if (!/^(\+7|8)\d{10}$/.test(digits)) errors.phone = 'Телефон должен быть в формате +79001234567';
  return errors;
}

function clearErrors() {
  for (const id of FIELDS) {
    document.querySelector('#' + id + '-error').textContent = '';
    document.querySelector('#' + id).removeAttribute('aria-invalid');
  }
}

function showErrors(errors) {
  for (const [id, message] of Object.entries(errors)) {
    const field = document.querySelector('#' + id);
    document.querySelector('#' + id + '-error').textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', id + '-error');
  }
  const first = FIELDS.find((id) => id in errors);
  document.querySelector('#' + first).focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = readData();
  const errors = validate(data);
  clearErrors();
  summary.textContent = '';
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }
  let text = 'Заказ для ' + data.name + ': ' + METHODS[data.method];
  if (data.method === 'delivery') text += ', ' + data.address;
  summary.textContent = text;
});
