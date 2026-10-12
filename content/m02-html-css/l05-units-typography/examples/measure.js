// Сколько символов поместится в строку колонки.
// Средняя ширина символа основного текста около 8px при 16px шрифта.
const CHAR_WIDTH = 8;

function charsPerLine(columnWidth) {
  return Math.floor(columnWidth / CHAR_WIDTH);
}

function isComfortable(chars) {
  return chars >= 60 && chars <= 75;
}

for (const width of [320, 520, 600, 984]) {
  const chars = charsPerLine(width);
  console.log(`${width}px: ${chars} символов, удобно: ${isComfortable(chars)}`);
}
