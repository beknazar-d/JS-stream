// Рендер списка: из каждого объекта массива получаем строку для строки списка.
const products = [
  { title: 'Чайник K-200', price: 2990, stock: 12 },
  { title: 'Блендер B-50', price: 4990, stock: 0 },
  { title: 'Тостер T-2', price: 2190, stock: 4 },
];

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\s/g, ' ') + ' ₽';
}

function toLine(product) {
  const note = product.stock === 0 ? ' (нет в наличии)' : '';
  return product.title + ' — ' + formatPrice(product.price) + note;
}

const lines = products.map(toLine);
for (const line of lines) console.log(line);
console.log(lines.length);
