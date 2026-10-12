// Какой rootMargin нужен? Картинка должна загрузиться до того, как её увидят.
function neededMargin(scrollSpeed, loadTimeMs) {
  // За время загрузки страница проедет scrollSpeed * время пикселей.
  return Math.ceil((scrollSpeed * loadTimeMs) / 1000);
}

console.log(neededMargin(600, 300)); // спокойная прокрутка
console.log(neededMargin(2400, 300)); // быстрая прокрутка колесом
console.log(neededMargin(2400, 1200)); // быстрая прокрутка и медленная сеть

// Берём запас с избытком и округляем.
const margin = Math.ceil(neededMargin(2400, 300) / 100) * 100;
console.log("rootMargin: '" + margin + "px 0px'");
