export function formatOrderNumber(sequence, year) {
  return "ORD-" + year + "-" + String(sequence).padStart(4, "0");
}

export function parseOrderNumber(text) {
  return text.slice(9);
}
