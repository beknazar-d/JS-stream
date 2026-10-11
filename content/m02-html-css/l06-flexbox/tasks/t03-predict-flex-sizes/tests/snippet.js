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

// Три карточки с flex: 1 (basis 0) в контейнере 600px
const equal = [
  { basis: 0, grow: 1, shrink: 1 },
  { basis: 0, grow: 1, shrink: 1 },
  { basis: 0, grow: 1, shrink: 1 },
];
console.log(resolve(600, equal).join(", "));

// Свободное место делится по grow: 1 и 3
const unequal = [
  { basis: 200, grow: 1, shrink: 1 },
  { basis: 100, grow: 3, shrink: 1 },
];
console.log(resolve(500, unequal).join(", "));

// Ни у кого нет grow: свободное место остаётся пустым
const fixed = [
  { basis: 100, grow: 0, shrink: 1 },
  { basis: 100, grow: 0, shrink: 1 },
  { basis: 100, grow: 0, shrink: 1 },
];
console.log(resolve(600, fixed).join(", "));

// Не хватает места: все сжимаются пропорционально базе
const tight = [
  { basis: 300, grow: 0, shrink: 1 },
  { basis: 200, grow: 0, shrink: 1 },
  { basis: 100, grow: 0, shrink: 1 },
];
console.log(resolve(450, tight).join(", "));

// То же, но первому запретили сжиматься: flex-shrink: 0
const pinned = [
  { basis: 300, grow: 0, shrink: 0 },
  { basis: 200, grow: 0, shrink: 1 },
  { basis: 100, grow: 0, shrink: 1 },
];
console.log(resolve(450, pinned).join(", "));
