// Изменение требований: API версии 2 присылает цену в копейках.
const v1 = { title: 'Чайник', price: 2990 };
const v2 = { title: 'Чайник', priceMinor: 299000 };

function formatRubles(rubles) {
  return rubles + ' ₽';
}

console.log(v1.title, formatRubles(v1.price));
console.log(v2.title, formatRubles(v2.priceMinor / 100));
console.log('без деления:', v2.priceMinor);
