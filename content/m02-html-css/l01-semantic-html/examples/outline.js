// План страницы по заголовкам: так её видит скринридер.
const headings = [
  { level: 1, text: "Холодильник Atlant XM 4421" },
  { level: 2, text: "Описание" },
  { level: 2, text: "Отзывы" },
  { level: 4, text: "Марина К." },
  { level: 2, text: "Похожие товары" },
];

let previous = 0;
for (const heading of headings) {
  const indent = "  ".repeat(heading.level - 1);
  const jump = heading.level - previous > 1 && previous !== 0;
  console.log(indent + "h" + heading.level + " " + heading.text + (jump ? "   <- пропущен уровень" : ""));
  previous = heading.level;
}
