export function parseQuantity(input) {
  if (typeof input !== 'string') {
    return null;
  }
  const quantity = Number(input.trim());
  if (Number.isNaN(quantity) || !Number.isInteger(quantity) || quantity < 0) {
    return null;
  }
  return quantity;
}
