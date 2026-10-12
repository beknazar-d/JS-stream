// response.json() делает то же, что JSON.parse: превращает текст в данные.
const text = '[{"title": "Чайник K-200", "price": 3490}, {"title": "Тостер T-2", "price": 2190}]';
const products = JSON.parse(text);

for (const product of products) {
  console.log(product.title + ' — ' + product.price + ' ₽');
}

// Если сервер вместо JSON прислал страницу ошибки, разбор падает.
function readProducts(body) {
  try {
    return JSON.parse(body);
  } catch (error) {
    console.log('Не удалось разобрать ответ: ' + error.name);
    return [];
  }
}

console.log(readProducts('<h1>Ошибка сервера</h1>').length);
console.log(readProducts('[]').length);
