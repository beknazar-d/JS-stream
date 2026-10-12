// Вес селектора как тройка: сколько в нём id, классов и тегов.
// Классы считаются вместе с атрибутами и псевдоклассами.
function weight(selector) {
  const ids = (selector.match(/#[\w-]+/g) || []).length;
  const classes = (selector.match(/\.[\w-]+|\[[^\]]+\]|:[\w-]+/g) || []).length;
  const rest = selector
    .replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|:[\w-]+/g, ' ')
    .split(/[\s>+~]+/)
    .filter(Boolean);
  return [ids, classes, rest.length];
}

// Побеждает больший вес, сравниваем слева направо. При равенстве выигрывает более поздний.
function winner(first, second) {
  const a = weight(first);
  const b = weight(second);
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i] ? first : second;
  }
  return second;
}

console.log(weight('.btn').join('-'));
console.log(weight('#catalog .card .btn:hover').join('-'));
console.log(weight('ul li a').join('-'));
console.log(winner('#catalog .btn', '.card .btn.btn--primary'));
console.log(winner('.btn.btn--accent', '.btn.btn--ghost'));
console.log(winner('a.link', '.link:hover'));
