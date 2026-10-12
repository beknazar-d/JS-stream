// Сколько места карточка занимает по горизонтали.
function outerWidth(box) {
  const edges = box.padding * 2 + box.border * 2;
  const total = box.boxSizing === "border-box" ? box.width : box.width + edges;
  return total + box.margin * 2;
}

const card = { width: 300, padding: 20, border: 2, margin: 10, boxSizing: "content-box" };
const fixed = { ...card, boxSizing: "border-box" };

console.log(outerWidth(card));
console.log(outerWidth(fixed));
console.log(Math.floor(1000 / outerWidth(card)));
console.log(Math.floor(1000 / outerWidth(fixed)));

// Расстояние между двумя блоками друг под другом.
function verticalGap(above, below, collapse) {
  return collapse ? Math.max(above, below) : above + below;
}

console.log(verticalGap(24, 32, true));
console.log(verticalGap(24, 32, false));
