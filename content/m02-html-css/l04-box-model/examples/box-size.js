// Размер коробки по горизонтали в двух режимах box-sizing.
function boxWidth(width, padding, border, boxSizing) {
  if (boxSizing === "border-box") {
    return width;
  }
  return width + padding * 2 + border * 2;
}

console.log("content-box: " + boxWidth(300, 20, 2, "content-box"));
console.log("border-box: " + boxWidth(300, 20, 2, "border-box"));
console.log("Содержимое в border-box: " + (300 - 20 * 2 - 2 * 2));
