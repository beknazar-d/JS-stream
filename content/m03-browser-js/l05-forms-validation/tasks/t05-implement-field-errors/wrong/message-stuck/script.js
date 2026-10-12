const MESSAGES = {
  address: { valueMissing: 'Введите адрес доставки' },
  email: {
    valueMissing: 'Введите почту, чтобы мы прислали чек',
    typeMismatch: 'Почта должна выглядеть так: name@example.com',
  },
  phone: {
    valueMissing: 'Введите телефон для курьера',
    patternMismatch: 'Телефон нужен в формате +79001234567',
  },
};

const form = document.querySelector('#delivery-form');
const status = document.querySelector('#status');
const fields = [...form.querySelectorAll('input')];

function errorOf(field) {
  return document.querySelector('#' + field.id + '-error');
}

function clearError(field) {
  field.removeAttribute('aria-invalid');
  errorOf(field).textContent = '';
}

function showError(field, message) {
  field.setCustomValidity(message);
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', errorOf(field).id);
  errorOf(field).textContent = message;
}

function validate(field) {
  clearError(field);
  if (field.validity.valid) return true;
  const messages = MESSAGES[field.id];
  const reason = Object.keys(messages).find((name) => field.validity[name]);
  showError(field, messages[reason] ?? field.validationMessage);
  return false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const invalid = fields.filter((field) => !validate(field));
  if (invalid.length > 0) {
    invalid[0].focus();
    return;
  }
  status.textContent = 'Адрес сохранён';
});

form.addEventListener('input', (event) => {
  clearError(event.target);
});
