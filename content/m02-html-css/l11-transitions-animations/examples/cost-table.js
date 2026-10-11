// Что делает браузер, когда меняется свойство.
// layout: пересчитать положение и размеры всей страницы или её части (дорого)
// paint: перерисовать пиксели (средне)
// composite: сдвинуть готовые слои (дёшево)
const cost = {
  width: "layout",
  height: "layout",
  margin: "layout",
  top: "layout",
  "font-size": "layout",
  color: "paint",
  "background-color": "paint",
  "box-shadow": "paint",
  transform: "composite",
  opacity: "composite",
};

function review(properties) {
  return properties.map((name) => `${name}: ${cost[name]}`);
}

console.log(review(["transform", "opacity"]).join(", "));
console.log(review(["background-color", "box-shadow"]).join(", "));
console.log(review(["width", "margin", "top"]).join(", "));
