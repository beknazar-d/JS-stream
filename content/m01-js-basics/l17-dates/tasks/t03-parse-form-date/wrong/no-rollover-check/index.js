export function parseFormDate(text) {
  const parts = text.split('.');
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}
