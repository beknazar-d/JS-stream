// Упрощённая модель элемента: хранит список обработчиков.
// Как и в браузере, одна и та же функция второй раз не добавляется.
function createTarget() {
  const handlers = [];
  return {
    addEventListener(fn) {
      if (!handlers.includes(fn)) handlers.push(fn);
    },
    click() {
      handlers.forEach((fn) => fn());
    },
  };
}

// Плохо: новая стрелка при каждой перерисовке.
const badList = createTarget();
let badClicks = 0;
function renderBad() {
  badList.addEventListener(() => {
    badClicks += 1;
  });
}
renderBad();
renderBad();
renderBad();
badList.click();
console.log('новая функция при каждом render:', badClicks);

// Хорошо: функция объявлена один раз.
const goodList = createTarget();
let goodClicks = 0;
function onClick() {
  goodClicks += 1;
}
function renderGood() {
  goodList.addEventListener(onClick);
}
renderGood();
renderGood();
renderGood();
goodList.click();
console.log('одна и та же функция:', goodClicks);
