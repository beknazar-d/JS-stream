// Контраст двух цветов по формуле WCAG: от 1 (одинаковые) до 21 (чёрный на белом).
function channel(value) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  ["#1d2733", "#ffffff", "тёмный текст на белом"],
  ["#ffffff", "#0b6e4f", "белый на зелёной кнопке"],
  ["#ffffff", "#3ddc97", "белый на светло-зелёном"],
  ["#06281c", "#3ddc97", "тёмный на светло-зелёном"],
];

for (const [fg, bg, label] of pairs) {
  const ratio = contrast(fg, bg);
  console.log(`${label}: ${ratio.toFixed(1)} ${ratio >= 4.5 ? "хватает" : "мало"}`);
}
