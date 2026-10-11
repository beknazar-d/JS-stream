// Как Flexbox делит свободное место между элементами.
function resolve(container, items) {
  let used = 0;
  for (const item of items) used += item.basis;
  const free = container - used;
  const sizes = [];

  if (free >= 0) {
    let growTotal = 0;
    for (const item of items) growTotal += item.grow;
    for (const item of items) {
      const share = growTotal === 0 ? 0 : (free * item.grow) / growTotal;
      sizes.push(item.basis + share);
    }
  } else {
    let weight = 0;
    for (const item of items) weight += item.basis * item.shrink;
    for (const item of items) {
      sizes.push(item.basis + (free * item.basis * item.shrink) / weight);
    }
  }
  return sizes;
}

// Три блока по 100px в контейнере 600px, grow: 1, 2, 1
const blocks = [
  { basis: 100, grow: 1, shrink: 1 },
  { basis: 100, grow: 2, shrink: 1 },
  { basis: 100, grow: 1, shrink: 1 },
];
console.log(resolve(600, blocks).join(", "));

// flex: 1 у трёх карточек: basis 0, grow 1
const cards = [
  { basis: 0, grow: 1, shrink: 1 },
  { basis: 0, grow: 1, shrink: 1 },
  { basis: 0, grow: 1, shrink: 1 },
];
console.log(resolve(600, cards).join(", "));
