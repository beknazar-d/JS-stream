// Какое объявление победит: важность, потом вес, потом порядок.
function compare(a, b) {
  if (a.important !== b.important) {
    return a.important ? a : b;
  }
  for (let i = 0; i < 3; i++) {
    if (a.weight[i] !== b.weight[i]) {
      return a.weight[i] > b.weight[i] ? a : b;
    }
  }
  return b.order > a.order ? b : a;
}

function pick(list) {
  return list.reduce(compare).selector;
}

const declarations = [
  { selector: "table.grid td", weight: [0, 1, 2], order: 1, important: false },
  { selector: ".orders td", weight: [0, 1, 1], order: 2, important: false },
  { selector: ".orders td.num", weight: [0, 2, 1], order: 3, important: false },
];

console.log(pick(declarations));
console.log(pick(declarations.slice(0, 2)));
console.log(pick([...declarations, { selector: ".quick-fix", weight: [0, 1, 0], order: 4, important: true }]));
