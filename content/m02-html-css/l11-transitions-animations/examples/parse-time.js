// CSS записывает время как 0.2s или 200ms. Переводим в миллисекунды.
function toMs(value) {
  const text = value.trim();
  if (text.endsWith("ms")) return parseFloat(text);
  if (text.endsWith("s")) return parseFloat(text) * 1000;
  return NaN;
}

// Браузер отдаёт списки через запятую: "0.2s, 150ms".
function durations(list) {
  return list.split(",").map(toMs);
}

console.log(toMs("0.2s"));
console.log(toMs("350ms"));
console.log(toMs("2"));
console.log(durations("0.2s, 150ms").join(", "));
console.log(durations("0s").every((ms) => ms === 0));
