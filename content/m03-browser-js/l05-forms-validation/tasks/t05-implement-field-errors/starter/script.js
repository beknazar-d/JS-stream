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

// Допишите обработчики: submit для всей формы и input для сброса ошибки поля.
