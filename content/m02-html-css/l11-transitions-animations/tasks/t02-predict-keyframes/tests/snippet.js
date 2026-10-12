// Модель анимации прозрачности по ключевым кадрам:
// @keyframes pulse { 0% { opacity: 0 } 50% { opacity: 1 } 100% { opacity: 0.5 } }
const keyframes = [
  { at: 0, value: 0 },
  { at: 50, value: 1 },
  { at: 100, value: 0.5 },
];

// Значение между соседними кадрами считается по прямой.
function valueAt(percent) {
  for (let i = 1; i < keyframes.length; i++) {
    const from = keyframes[i - 1];
    const to = keyframes[i];
    if (percent <= to.at) {
      const t = (percent - from.at) / (to.at - from.at);
      return from.value + (to.value - from.value) * t;
    }
  }
}

// animation: pulse 2s linear 1s 2
// то есть длительность 2000 мс, задержка 1000 мс, два повтора.
// Возвращает, сколько процентов одного прохода пройдено.
function progress(timeMs, durationMs, delayMs, iterations) {
  const elapsed = timeMs - delayMs;
  if (elapsed < 0) return 0;
  if (elapsed >= durationMs * iterations) return 100;
  return ((elapsed % durationMs) / durationMs) * 100;
}

console.log(valueAt(25));
console.log(valueAt(75));
console.log(valueAt(100));
console.log(progress(500, 2000, 1000, 2));
console.log(progress(2000, 2000, 1000, 2));
console.log(progress(3000, 2000, 1000, 2));
console.log(progress(5000, 2000, 1000, 2));
console.log(valueAt(progress(4000, 2000, 1000, 2)));
