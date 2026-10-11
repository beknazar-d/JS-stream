export function canFulfill(requested, available) {
  const wanted = Number(requested);
  const inStock = Number(available);

  if (!Number.isInteger(wanted) || wanted < 1) {
    return false;
  }
  return wanted < inStock;
}
