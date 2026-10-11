export function parseFormDate(text) {
  const [day, month, year] = text.split('.').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}
