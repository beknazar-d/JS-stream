function specificity(selector) {
  const ids = (selector.match(/#[\w-]+/g) || []).length;
  const classes = (selector.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) || []).length;
  const rest = selector.replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|::?[\w-]+/g, " ");
  const tags = (rest.match(/[a-z][\w-]*/gi) || []).length;
  return [ids, classes, tags];
}

// Побеждает больший вес, при равенстве — правило ниже по тексту.
function winner(first, second) {
  const a = specificity(first);
  const b = specificity(second);
  for (let i = 0; i < 3; i++) {
    if (a[i] > b[i]) return first;
    if (a[i] < b[i]) return second;
  }
  return second;
}

console.log(specificity("p").join(","));
console.log(specificity(".card .price").join(","));
console.log(specificity("ul li a:hover").join(","));
console.log(specificity("#app .card.sale").join(","));
console.log(specificity("button[disabled]").join(","));
console.log(winner(".price", ".card .price"));
console.log(winner(".sale", ".price"));
console.log(winner("#promo", ".card.sale.hit.new"));
console.log(winner("main p", ".note"));
