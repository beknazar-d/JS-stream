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

function report(foreground, background, large) {
  const ratio = contrast(foreground, background);
  const needed = large ? 3 : 4.5;
  console.log(ratio.toFixed(2) + ' ' + (ratio >= needed));
}

report('#000000', '#ffffff', false);
report('#767676', '#ffffff', false);
report('#777777', '#ffffff', false);
report('#777777', '#ffffff', true);
report('#ffffff', '#ffffff', true);
report('#ffffff', '#0b3d91', false);
