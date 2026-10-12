// Что считается крупным текстом в WCAG: 18pt или 14pt жирным.
// В CSS размер задают в пикселях, а 1pt равен 96/72 пикселя.
function pointsToPixels(points) {
  return (points * 96) / 72;
}

function isLargeText(fontSizePx, isBold) {
  return fontSizePx >= pointsToPixels(18) || (isBold && fontSizePx >= pointsToPixels(14));
}

console.log('18pt в пикселях:', pointsToPixels(18));
console.log('14pt в пикселях:', pointsToPixels(14).toFixed(2));
console.log('Заголовок 28px:', isLargeText(28, false));
console.log('Текст 16px:', isLargeText(16, false));
console.log('Жирная цена 20px:', isLargeText(20, true));
console.log('Обычная цена 20px:', isLargeText(20, false));
