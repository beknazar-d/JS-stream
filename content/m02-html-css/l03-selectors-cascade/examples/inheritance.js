// Наследование: color и font-size переходят к потомкам, border и margin нет.
const inherited = ["color", "font-size", "line-height", "font-family"];

const body = { color: "#222222", "font-size": "16px", border: "2px solid red" };
const card = { margin: "8px" };
const title = {};

const chain = [title, card, body];

function valueOf(property) {
  for (const element of chain) {
    if (property in element) {
      return element[property];
    }
    if (!inherited.includes(property)) {
      return "по умолчанию";
    }
  }
  return "по умолчанию";
}

console.log("color: " + valueOf("color"));
console.log("font-size: " + valueOf("font-size"));
console.log("border: " + valueOf("border"));
console.log("margin: " + valueOf("margin"));
