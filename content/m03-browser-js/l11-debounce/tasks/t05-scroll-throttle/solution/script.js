const topButton = document.querySelector('#top');
const counter = document.querySelector('#updates');
let updates = 0;

// Показывает кнопку «Наверх», когда страницу прокрутили от верха на 400 px и больше.
function updateBackToTop() {
  updates += 1;
  counter.textContent = String(updates);
  topButton.hidden = window.scrollY < 400;
}

// Не чаще одного раза за interval мс; последнее событие серии тоже выполняется.
function throttle(fn, interval) {
  let lastCall = 0;
  let timer;

  return (...args) => {
    const wait = interval - (Date.now() - lastCall);
    clearTimeout(timer);
    if (wait <= 0) {
      lastCall = Date.now();
      fn(...args);
    } else {
      timer = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
      }, wait);
    }
  };
}

window.addEventListener('scroll', throttle(updateBackToTop, 100));
