// Сколько карточек влезет в строку шириной 960.
const row = 960;
const card = { width: 300, padding: 16, border: 1, margin: 10 };

const contentBox = card.width + card.padding * 2 + card.border * 2 + card.margin * 2;
const borderBox = card.width + card.margin * 2;

console.log("content-box занимает " + contentBox + ", влезет " + Math.floor(row / contentBox));
console.log("border-box занимает " + borderBox + ", влезет " + Math.floor(row / borderBox));
