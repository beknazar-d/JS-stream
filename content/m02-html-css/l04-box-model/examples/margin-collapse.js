// Расстояние между двумя блоками друг под другом.
function gap(marginBottomAbove, marginTopBelow) {
  return Math.max(marginBottomAbove, marginTopBelow);
}

console.log("Отступы 30 и 20: " + gap(30, 20));
console.log("Отступы 24 и 24: " + gap(24, 24));
console.log("Если сложить: " + (30 + 20));
