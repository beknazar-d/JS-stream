// Что будет, если места не хватает: элементы сжимаются пропорционально базе.
function shrink(container, items) {
  let used = 0;
  let weight = 0;
  for (const item of items) {
    used += item.basis;
    weight += item.basis * item.shrink;
  }
  const overflow = used - container;
  return items.map((item) => item.basis - (overflow * item.basis * item.shrink) / weight);
}

const row = [
  { basis: 300, shrink: 1 },
  { basis: 200, shrink: 1 },
  { basis: 100, shrink: 1 },
];
console.log(shrink(450, row).join(", "));

// Первому блоку запретили сжиматься: flex-shrink: 0
const pinned = [
  { basis: 300, shrink: 0 },
  { basis: 200, shrink: 1 },
  { basis: 100, shrink: 1 },
];
console.log(shrink(450, pinned).join(", "));
