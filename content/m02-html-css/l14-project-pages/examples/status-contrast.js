// Проверка контраста статусов панели менеджера: цвет текста на цвете бейджа.
function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const parts = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));
  return 0.2126 * channel(parts[0]) + 0.7152 * channel(parts[1]) + 0.0722 * channel(parts[2]);
}

function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const statuses = [
  ['Оплачен', '#166534', '#dcfce7'],
  ['Ждёт поставки', '#9a3412', '#ffedd5'],
  ['Ждёт поставки (светлее)', '#fb923c', '#ffedd5'],
];

for (const [name, text, background] of statuses) {
  const ratio = contrast(text, background);
  console.log(name + ': ' + ratio.toFixed(2) + (ratio >= 4.5 ? ' проходит' : ' не проходит'));
}
