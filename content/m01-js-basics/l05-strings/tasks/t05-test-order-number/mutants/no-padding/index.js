export function formatOrderNumber(sequence, year) {
  return "ORD-" + year + "-" + String(sequence);
}

export function parseOrderNumber(text) {
  return Number(text.slice(9));
}
