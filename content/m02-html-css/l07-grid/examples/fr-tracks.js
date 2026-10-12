// Как браузер делит ширину между px и fr.
function tracks(container, gap, columns) {
  const gaps = gap * (columns.length - 1);
  let fixed = 0;
  let frTotal = 0;
  for (const column of columns) {
    if (column.endsWith("fr")) frTotal += Number.parseFloat(column);
    else fixed += Number.parseFloat(column);
  }
  const free = container - fixed - gaps;
  return columns.map((column) =>
    column.endsWith("fr") ? (free * Number.parseFloat(column)) / frTotal : Number.parseFloat(column)
  );
}

console.log(tracks(960, 30, ["1fr", "1fr", "1fr"]).join(", "));
console.log(tracks(940, 20, ["200px", "1fr", "1fr"]).join(", "));
console.log(tracks(620, 20, ["1fr", "2fr"]).join(", "));
