export function toNumber(value) {
  return parseInt(value);
}

export function toText(value) {
  return String(value);
}

export function isNotANumber(value) {
  return Number.isNaN(value);
}
