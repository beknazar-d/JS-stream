// Модель дебаунса: по времени нажатий (мс) считаем, когда сработает поиск.
// Поиск срабатывает, если после нажатия прошла пауза не короче задержки.
function debounceModel(pressTimes, delay) {
  const fired = [];
  pressTimes.forEach((time, index) => {
    const next = pressTimes[index + 1];
    if (next === undefined || next - time >= delay) {
      fired.push(time + delay);
    }
  });
  return fired;
}

const presses = [0, 120, 250, 900, 1000];
console.log('нажатия:', presses);
console.log('запросы при задержке 300:', debounceModel(presses, 300));
console.log('запросы при задержке 100:', debounceModel(presses, 100));
