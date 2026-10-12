// Модель троттлинга: первое событие проходит сразу,
// следующие ждут, пока с прошлого вызова не пройдёт интервал.
function throttleModel(eventTimes, interval) {
  const fired = [];
  let lastCall = -Infinity;
  for (const time of eventTimes) {
    if (time - lastCall >= interval) {
      fired.push(time);
      lastCall = time;
    }
  }
  return fired;
}

const scrolls = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];
const calls = throttleModel(scrolls, 200);
console.log('событий прокрутки:', scrolls.length);
console.log('вызовов с троттлингом:', calls.length);
console.log('моменты вызовов:', calls);
