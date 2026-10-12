// Три вложенных блока, у каждого font-size: 1.25em (от родителя).
let size = 16;
for (let level = 1; level <= 3; level++) {
  size = size * 1.25;
  console.log(`уровень ${level}: ${size}px`);
}

// Те же блоки с font-size: 1.25rem (всегда от корня).
const remSize = 1.25 * 16;
console.log(`rem на любом уровне: ${remSize}px`);
