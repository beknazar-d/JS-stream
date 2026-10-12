export function makeDiscount(percent) {
  return (price) => (price * (100 - percent)) / 100;
}
