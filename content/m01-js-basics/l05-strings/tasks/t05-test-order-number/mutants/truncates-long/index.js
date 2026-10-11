export function formatOrderNumber(sequence, year) {
  return "ORD-" + year + "-" + String(sequence).padStart(4, "0").slice(-4);
}

export function parseOrderNumber(text) {
  return Number(text.slice(9));
}
