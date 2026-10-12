// Проверку удобно вынести в функцию без DOM: данные внутрь, ошибки наружу.
function validate(data) {
  const errors = {};
  if (data.name.trim() === '') errors.name = 'Введите имя';
  if (!/^\+7\d{10}$/.test(data.phone)) errors.phone = 'Телефон в формате +79001234567';
  if (data.method === 'delivery' && data.address.trim() === '') {
    errors.address = 'Введите адрес доставки';
  }
  return errors;
}

const good = { name: 'Анна', phone: '+79001234567', method: 'delivery', address: 'Москва, Лесная, 5' };
const bad = { name: ' ', phone: 'abc', method: 'delivery', address: '' };
const pickup = { name: 'Игорь', phone: '+79001234567', method: 'pickup', address: '' };

console.log(JSON.stringify(validate(good)));
console.log(JSON.stringify(validate(bad)));
console.log(JSON.stringify(validate(pickup)));
