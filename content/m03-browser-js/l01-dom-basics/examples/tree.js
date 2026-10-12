// Модель дерева документа: у узла есть тег, классы и дети.
const page = {
  tag: 'body',
  classes: [],
  children: [
    { tag: 'header', classes: ['site-header'], children: [{ tag: 'a', classes: ['logo'], children: [] }] },
    {
      tag: 'main',
      classes: [],
      children: [
        {
          tag: 'ul',
          classes: ['catalog'],
          children: [
            { tag: 'li', classes: ['card'], children: [] },
            { tag: 'li', classes: ['card', 'card--sale'], children: [] },
          ],
        },
      ],
    },
  ],
};

function label(node) {
  return node.tag + node.classes.map((name) => '.' + name).join('');
}

function print(node, depth = 0) {
  console.log('  '.repeat(depth) + label(node));
  for (const child of node.children) print(child, depth + 1);
}

print(page);
