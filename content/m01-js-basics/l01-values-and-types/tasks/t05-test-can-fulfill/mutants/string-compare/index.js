export function canFulfill(requested, available) {
  const wanted = Number(requested);

  if (!Number.isInteger(wanted) || wanted < 1) {
    return false;
  }
  return requested <= available;
}
