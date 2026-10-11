// Вес селектора: сколько идентификаторов, классов и тегов.
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

for (const selector of ["p", ".price", "#promo", ".card .price", "#app .card.sale"]) {
  console.log(`${selector} → ${specificity(selector).join(",")}`);
}
console.log(winner(".card .price", ".sale"));
console.log(winner("#promo", ".card.sale.hit"));
