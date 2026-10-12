// Как страница проекта выбирает раскладку по ширине окна (mobile-first).
function layoutFor(width) {
  const columns = width >= 900 ? 'две колонки' : 'одна колонка';
  const kpis = width >= 600 ? 'карточки в ряд' : 'карточки столбиком';
  return columns + ', ' + kpis;
}

for (const width of [375, 599, 600, 768, 899, 900, 1024]) {
  console.log(width + ': ' + layoutFor(width));
}
