function readCart(text) {
  try {
    return JSON.stringify(JSON.parse(text));
  } catch (error) {
    return `${error.name}: ${error.message}`;
  }
}

console.log(readCart('{"qty":2}'));
console.log(readCart("{'qty':2}"));
console.log(readCart('{"qty":2,}'));
console.log(readCart(''));
console.log(readCart('abc'));
console.log(readCart('[1,2'));
