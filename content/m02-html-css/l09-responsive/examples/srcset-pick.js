// Упрощённая модель выбора картинки из srcset.
// Браузер сам решает, какую взять, но логика примерно такая:
// нужна картинка не уже, чем место на экране, умноженное на плотность пикселей.
const candidates = [
  { file: "kettle-400.jpg", width: 400 },
  { file: "kettle-800.jpg", width: 800 },
  { file: "kettle-1200.jpg", width: 1200 },
];

function pick(slotWidth, pixelRatio) {
  const needed = slotWidth * pixelRatio;
  const enough = candidates.find((item) => item.width >= needed);
  return (enough ?? candidates[candidates.length - 1]).file;
}

console.log(pick(343, 1));
console.log(pick(343, 2));
console.log(pick(928, 1));
console.log(pick(928, 2));
