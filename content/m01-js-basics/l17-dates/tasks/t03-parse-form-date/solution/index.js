export function parseFormDate(text) {
  const parts = text.split('.');
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts.map(Number);
  if (![day, month, year].every(Number.isInteger)) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  const isReal =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  return isReal ? date : null;
}
