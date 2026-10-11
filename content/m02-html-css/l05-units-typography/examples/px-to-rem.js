// Макет в пикселях, код в rem. Корень страницы — 16px.
const ROOT = 16;

function pxToRem(px) {
  return px / ROOT;
}

console.log(pxToRem(24));
console.log(pxToRem(14));
console.log(pxToRem(10));
console.log(`${pxToRem(32)}rem`);
console.log("16px" / ROOT);
console.log(Number.parseFloat("16px") / ROOT);
