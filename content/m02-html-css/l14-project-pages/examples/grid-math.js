// Ширина колонки сетки: (ширина контейнера - зазоры) / число колонок.
function columnWidth(container, columns, gap) {
  return (container - gap * (columns - 1)) / columns;
}

console.log('Сводка на 1024:', columnWidth(960, 3, 16).toFixed(2));
console.log('Сводка на 768:', columnWidth(768 - 32, 3, 16).toFixed(2));
console.log('Сводка на 375:', columnWidth(375 - 32, 1, 12).toFixed(2));
console.log('Город при колонках 2fr и 1fr:', (((686 - 16) * 2) / 3).toFixed(2));
