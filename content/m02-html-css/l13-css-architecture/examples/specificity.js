// Вес селектора: id, классы (с атрибутами и псевдоклассами), теги.
function weight(selector) {
  const ids = (selector.match(/#[\w-]+/g) || []).length;
  const classes = (selector.match(/\.[\w-]+|\[[^\]]+\]|:[\w-]+/g) || []).length;
  const rest = selector
    .replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|:[\w-]+/g, ' ')
    .split(/[\s>+~]+/)
    .filter(Boolean);
  return [ids, classes, rest.length];
}

const selectors = [
  '.btn',
  '.btn.btn--accent',
  '.card .btn.btn--primary',
  '#catalog .btn',
  '#catalog .card .btn:hover',
];

for (const selector of selectors) {
  console.log(selector + ' → ' + weight(selector).join('-'));
}
