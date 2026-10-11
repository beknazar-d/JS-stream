function parseHex(value) {
  let digits = String(value).replace('#', '');
  if (digits.length === 3) {
    digits = digits[0] + digits[0] + digits[1] + digits[1] + digits[2] + digits[2];
  }
  return [0, 2, 4].map((start) => parseInt(digits.slice(start, start + 2), 16));
}

function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function meetsAA(foreground, background, isLarge) {
  return contrastRatio(foreground, background) >= (isLarge ? 3 : 4.5);
}

export function isLargeText(fontSizePx, isBold) {
  return fontSizePx >= 24 || (isBold && fontSizePx >= (14 * 96) / 72);
}
