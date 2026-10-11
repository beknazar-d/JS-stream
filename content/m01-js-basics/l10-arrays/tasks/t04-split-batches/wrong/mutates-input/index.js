export function splitIntoBatches(orders, size) {
  const batches = [];
  while (orders.length > 0) {
    batches.push(orders.splice(0, size));
  }
  return batches;
}
