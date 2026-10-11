export function parseQuantity(input) {
  if (typeof input !== 'string') {
    return null;
  }
  const quantity = parseInt(input, 10);
  if (Number.isNaN(quantity) || quantity < 0) {
    return null;
  }
  return quantity;
}
