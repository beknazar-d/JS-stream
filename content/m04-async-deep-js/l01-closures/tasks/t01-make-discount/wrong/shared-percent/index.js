let current = 0;

export function makeDiscount(percent) {
  current = percent;
  return (price) => Math.round((price * (100 - current)) / 100);
}
