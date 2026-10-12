// Правила dataset: data-имя-через-дефис читается как имяЧерезДефис.
function toKey(attribute) {
  return attribute.replace('data-', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toAttribute(key) {
  return 'data-' + key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
}

console.log(toKey('data-product-id'));
console.log(toKey('data-old-price-rub'));
console.log(toAttribute('stockLeft'));
console.log(toAttribute('id'));

// Значение, прочитанное из data-stock="0", — строка.
const stock = '0';
console.log(typeof stock);
console.log(Boolean(stock));
console.log(Number(stock) > 0);
console.log(stock + 1);
