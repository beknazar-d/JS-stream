export function discountFor(qty) {
  if (qty >= 10) {
    return 0.1;
  }
  if (qty >= 5) {
    return 0.05;
  }
  return 0;
}
