// Контраст двух цветов по формуле WCAG 2.1.
function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const pairs = [
  ['Цена: тёмный текст на белом', '#1a1a1a', '#ffffff'],
  ['Подпись: светло-серый на белом', '#999999', '#ffffff'],
  ['Кнопка: белый на синем', '#ffffff', '#0b3d91'],
  ['Бейдж: белый на оранжевом', '#ffffff', '#e8590c'],
];

for (const [name, foreground, background] of pairs) {
  const ratio = contrast(foreground, background);
  console.log(name + ': ' + ratio.toFixed(2) + ' (обычный текст ' + (ratio >= 4.5 ? 'проходит' : 'не проходит') + ')');
}
