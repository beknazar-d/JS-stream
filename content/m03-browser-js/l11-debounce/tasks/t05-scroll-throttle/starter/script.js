const topButton = document.querySelector('#top');
const counter = document.querySelector('#updates');
let updates = 0;

// Показывает кнопку «Наверх», когда страницу прокрутили от верха на 400 px и больше.
function updateBackToTop() {
  updates += 1;
  counter.textContent = String(updates);
  topButton.hidden = window.scrollY < 400;
}

// Напишите throttle(fn, interval) и подключите её ниже.

// Сейчас функция вызывается на каждое событие прокрутки.
window.addEventListener('scroll', updateBackToTop);
