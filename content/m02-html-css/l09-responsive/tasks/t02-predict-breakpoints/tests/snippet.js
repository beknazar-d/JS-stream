// Модель того, что делает браузер. Ширина окна в px.
const clamp = (min, preferred, max) => Math.min(Math.max(preferred, min), max);
const vw = (width, percent) => (width * percent) / 100;

// font-size: clamp(20px, 8px + 3vw, 32px)
const titleSize = (width) => clamp(20, 8 + vw(width, 3), 32);

// Сначала телефон, потом дополнения от 768px и от 1024px.
const columns = (width) => {
  let result = 1;
  if (width >= 768) result = 2;
  if (width >= 1024) result = 3;
  return result;
};

console.log(titleSize(320));
console.log(titleSize(600));
console.log(titleSize(1200));
console.log(columns(375));
console.log(columns(767));
console.log(columns(768));
console.log(columns(1024));
