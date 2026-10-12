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
  let lastCall = 0;
  return (...args) => {
    if (Date.now() - lastCall >= interval) {
      lastCall = Date.now();
      fn(...args);
    }
  };
}

window.addEventListener('scroll', (event) => throttle(updateBackToTop, 100)(event));
