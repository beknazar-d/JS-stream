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

function autoFill(container, gap, min) {
  const count = Math.max(1, Math.floor((container + gap) / (min + gap)));
  const width = (container - gap * (count - 1)) / count;
  return { count, width };
}

// repeat(3, 1fr), gap 30px
console.log(tracks(960, 30, ["1fr", "1fr", "1fr"]).join(", "));

// 200px 1fr 1fr, gap 20px
console.log(tracks(940, 20, ["200px", "1fr", "1fr"]).join(", "));

// 1fr 2fr, gap 20px
console.log(tracks(620, 20, ["1fr", "2fr"]).join(", "));

// repeat(auto-fill, minmax(200px, 1fr)), gap 20px
const wide = autoFill(1000, 20, 200);
console.log(`${wide.count} колонки по ${wide.width}px`);

const narrow = autoFill(400, 20, 200);
console.log(`${narrow.count} колонка по ${narrow.width}px`);

// элемент с grid-column: span 2 в сетке из четырёх колонок
console.log(2 * wide.width + 20);
