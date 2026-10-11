const ROOT = 16;
const pxToRem = (px) => px / ROOT;

console.log(pxToRem(24));
console.log(pxToRem(14));
console.log(`${pxToRem(40)}rem`);
console.log("20px" / ROOT);
console.log(Number.parseFloat("20px") / ROOT);

// три вложенных блока: font-size 1.5em у каждого, корень 16px
let size = ROOT;
size = size * 1.5;
size = size * 1.5;
console.log(size);

// те же блоки, но font-size 1.5rem
console.log(1.5 * ROOT);

// строка в 520px при средней ширине символа 8px
console.log(Math.floor(520 / 8));
