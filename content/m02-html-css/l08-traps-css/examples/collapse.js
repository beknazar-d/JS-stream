// Схлопывание вертикальных отступов двух соседних блоков.
function collapse(bottomOfFirst, topOfSecond) {
  if (bottomOfFirst >= 0 && topOfSecond >= 0) return Math.max(bottomOfFirst, topOfSecond);
  if (bottomOfFirst < 0 && topOfSecond < 0) return Math.min(bottomOfFirst, topOfSecond);
  return bottomOfFirst + topOfSecond;
}

console.log(collapse(24, 16));
console.log(collapse(24, -8));
console.log(collapse(-24, -8));
console.log(collapse(0, 16));
