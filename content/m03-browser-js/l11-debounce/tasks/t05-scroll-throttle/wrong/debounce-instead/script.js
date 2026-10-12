const topButton = document.querySelector('#top');
const counter = document.querySelector('#updates');
let updates = 0;

// Показывает кнопку «Наверх», когда страницу прокрутили от верха на 400 px и больше.
function updateBackToTop() {
  updates += 1;
  counter.textContent = String(updates);
  topButton.hidden = window.scrollY < 400;
}

function throttle(fn, interval) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), interval);
  };
}

window.addEventListener('scroll', throttle(updateBackToTop, 100));
