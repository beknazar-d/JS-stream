const lines = [" M src/cart.js", "A  src/utils.js", "?? notes.txt", "MM src/stock.js"];

for (const line of lines) {
  const code = line.slice(0, 2);
  const file = line.slice(3);
  const staged = code[0] !== " " && code[0] !== "?";
  console.log(file, staged);
}

console.log(lines[3].slice(0, 2) === "MM");
console.log("[" + lines[0].slice(0, 2) + "]");
