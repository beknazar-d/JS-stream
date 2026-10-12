// Атрибут data-product-id в JavaScript называется dataset.productId.
function toKey(attribute) {
  return attribute.replace('data-', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toAttribute(key) {
  return 'data-' + key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
}

console.log(toKey('data-product-id'));
console.log(toKey('data-stock'));
console.log(toAttribute('productId'));
console.log(toAttribute('oldPriceRub'));

// Значение атрибута всегда строка.
const stock = '0';
console.log(typeof stock);
console.log(Number(stock) === 0);
