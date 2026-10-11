// Модель функции clamp(): значение не меньше минимума и не больше максимума.
// font-size: clamp(1rem, 0.5rem + 2vw, 1.75rem), 1rem = 16px.
const clamp = (min, preferred, max) => Math.min(Math.max(preferred, min), max);

function fontSize(windowWidth) {
  const preferred = 8 + (windowWidth * 2) / 100; // 0.5rem + 2vw
  return clamp(16, preferred, 28);
}

for (const width of [375, 768, 1440]) {
  console.log(`${width}px -> ${fontSize(width).toFixed(2)}px`);
}
