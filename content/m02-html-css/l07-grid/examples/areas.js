// Где окажется область в сетке: читаем grid-template-areas как таблицу.
const rows = [
  ["header", "header", "header"],
  ["nav", "main", "aside"],
  ["footer", "footer", "footer"],
];

function where(name) {
  const cells = [];
  rows.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === name) cells.push([r + 1, c + 1]);
  }));
  const rowsUsed = cells.map((cell) => cell[0]);
  const colsUsed = cells.map((cell) => cell[1]);
  return `${name}: ряд ${Math.min(...rowsUsed)}, колонки ${Math.min(...colsUsed)}–${Math.max(...colsUsed)}`;
}

for (const name of ["header", "nav", "main", "footer"]) {
  console.log(where(name));
}
