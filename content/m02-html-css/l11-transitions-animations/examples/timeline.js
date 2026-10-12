// Как браузер считает положение при анимации: время -> доля пути -> значение.
// Упрощённая модель: ease-in заменён на t * t (настоящая кривая немного иная).
const easings = {
  linear: (t) => t,
  "ease-in": (t) => t * t,
};

// transform: translateX(0) -> translateX(100px) за 1000 мс
function translateX(timeMs, durationMs, easing) {
  const t = Math.min(timeMs / durationMs, 1);
  return 100 * easings[easing](t);
}

for (const time of [0, 250, 500, 1000]) {
  const linear = translateX(time, 1000, "linear");
  const easeIn = translateX(time, 1000, "ease-in");
  console.log(`${time} мс: linear ${linear}px, ease-in ${easeIn}px`);
}
