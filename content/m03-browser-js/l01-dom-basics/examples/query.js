// Так работают querySelector и querySelectorAll: обход дерева сверху вниз.
const page = {
  tag: 'body',
  classes: [],
  children: [
    { tag: 'h1', classes: ['title'], children: [] },
    {
      tag: 'ul',
      classes: ['catalog'],
      children: [
        { tag: 'li', classes: ['card'], children: [] },
        { tag: 'li', classes: ['card', 'card--sale'], children: [] },
        { tag: 'li', classes: ['card'], children: [] },
      ],
    },
  ],
};

// Упрощённый селектор: либо тег (li), либо класс (.card).
function matches(node, selector) {
  if (selector.startsWith('.')) return node.classes.includes(selector.slice(1));
  return node.tag === selector;
}

function queryAll(root, selector) {
  const found = [];
  for (const child of root.children) {
    if (matches(child, selector)) found.push(child);
    found.push(...queryAll(child, selector));
  }
  return found;
}

function query(root, selector) {
  const all = queryAll(root, selector);
  return all.length > 0 ? all[0] : null;
}

console.log(queryAll(page, '.card').length);
console.log(query(page, '.card--sale').classes.join(' '));
console.log(query(page, '.nope'));
console.log(queryAll(page, '.nope').length);
