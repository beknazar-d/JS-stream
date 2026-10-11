export function makeDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

export function isoDay(date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}
