// Сначала телефон: каждая контрольная точка только добавляет.
// Какие запросы min-width сработали на этой ширине?
const breakpoints = [768, 1024];

function matched(windowWidth) {
  return breakpoints.filter((point) => windowWidth >= point);
}

function columns(windowWidth) {
  return 1 + matched(windowWidth).length;
}

for (const width of [375, 767, 768, 1024, 1440]) {
  console.log(`${width}px: сработало ${matched(width).length}, колонок ${columns(width)}`);
}
