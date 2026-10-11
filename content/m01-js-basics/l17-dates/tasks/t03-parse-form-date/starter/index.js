// Разбирает дату из формы вида ДД.ММ.ГГГГ.
export function parseFormDate(text) {
  const [day, month, year] = text.split('.');
  return new Date(year, month, day);
}
