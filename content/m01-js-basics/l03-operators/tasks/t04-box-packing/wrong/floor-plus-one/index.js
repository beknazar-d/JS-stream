export function fullBoxes(items, perBox) {
  return Math.floor(items / perBox);
}

export function looseItems(items, perBox) {
  return items % perBox;
}

export function boxesToShip(items, perBox) {
  return Math.floor(items / perBox) + 1;
}

export function isLastBoxFull(items, perBox) {
  return items % perBox === 0;
}
