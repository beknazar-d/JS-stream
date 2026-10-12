export function makeDiscount(percent) {
  return (price) => Math.round((price * (100 - percent)) / 100);
}
