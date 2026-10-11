export function splitIntoBatches(orders, size) {
  const batches = [];
  for (let start = 0; start < orders.length; start += size) {
    batches.push(orders.slice(start, start + size));
  }
  return batches;
}
