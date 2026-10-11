// repeat(auto-fill, minmax(220px, 1fr)) и gap 16px.
function autoFill(container, gap, min) {
  const columns = Math.max(1, Math.floor((container + gap) / (min + gap)));
  const width = (container - gap * (columns - 1)) / columns;
  return { columns, width };
}

for (const container of [984, 700, 359]) {
  const { columns, width } = autoFill(container, 16, 220);
  console.log(`окно ${container}px: колонок ${columns}, ширина ${Math.round(width)}px`);
}

// Две карточки в широком контейнере.
const { columns, width } = autoFill(984, 16, 220);
console.log(`auto-fill: колонок ${columns}, ширина карточки ${Math.round(width)}px`);
console.log(`auto-fit: колонок 2, ширина карточки ${Math.round((984 - 16) / 2)}px`);
