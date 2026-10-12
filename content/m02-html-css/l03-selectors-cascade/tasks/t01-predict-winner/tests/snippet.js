// Правила из CSS кнопки «В корзину». Вес: [идентификаторы, классы, теги].
const rules = [
  { selector: ".btn", weight: [0, 1, 0] },
  { selector: ".card .btn", weight: [0, 2, 0] },
  { selector: "button.btn", weight: [0, 1, 1] },
  { selector: ".product .btn", weight: [0, 2, 0] },
  { selector: "#cart .btn", weight: [1, 1, 0] },
  { selector: "a.btn:hover", weight: [0, 2, 1] },
];

// Побеждает больший вес. При равенстве побеждает более позднее правило (b).
function stronger(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a.weight[i] !== b.weight[i]) {
      return a.weight[i] > b.weight[i] ? a : b;
    }
  }
  return b;
}

let winner = rules[0];
for (let i = 1; i < rules.length; i++) {
  winner = stronger(winner, rules[i]);
  console.log(winner.selector);
}
console.log(winner.weight.join("-"));
