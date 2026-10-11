export function parseQuantity(input) {
  if (typeof input !== 'string') {
    return null;
  }
  const text = input.trim();
  if (text === '') {
    return null;
  }
  const quantity = Number(text);
  if (Number.isNaN(quantity)) {
    return null;
  }
  return quantity;
}
