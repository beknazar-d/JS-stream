// Токены — обычные данные. Из них можно собрать блок CSS.
const light = {
  "color-bg": "#f7f8fa",
  "color-text": "#1d2733",
  "color-brand": "#0b6e4f",
};

const dark = {
  "color-bg": "#12161c",
  "color-text": "#e8edf2",
  "color-brand": "#3ddc97",
};

function block(selector, tokens) {
  const lines = Object.entries(tokens).map(([name, value]) => `  --${name}: ${value};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

console.log(block(":root", light));
console.log(block('[data-theme="dark"]', dark));
