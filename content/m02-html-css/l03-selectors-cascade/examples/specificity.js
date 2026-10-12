// Вес простого селектора: [идентификаторы, классы, теги].
// Работает для селекторов без :not() и без скобок со сложным содержимым.
function specificity(selector) {
  const parts = selector.replaceAll(">", " ").replaceAll("+", " ").split(" ").filter((part) => part !== "");
  let ids = 0;
  let classes = 0;
  let tags = 0;

  for (const part of parts) {
    const first = part[0];
    if (first !== "#" && first !== "." && first !== "[" && first !== ":" && first !== "*") {
      tags++;
    }
    for (let i = 0; i < part.length; i++) {
      const char = part[i];
      if (char === "#") ids++;
      if (char === "." || char === "[") classes++;
      if (char === ":") {
        if (part[i + 1] === ":") {
          tags++;
          i++;
        } else {
          classes++;
        }
      }
    }
  }
  return [ids, classes, tags];
}

const selectors = ["p", ".btn", "ul li a", "button.btn.sale", ".card > .title", "a[href]:hover", "#cart .btn", "p::first-line"];
for (const selector of selectors) {
  console.log(selector + " -> " + specificity(selector).join("-"));
}
