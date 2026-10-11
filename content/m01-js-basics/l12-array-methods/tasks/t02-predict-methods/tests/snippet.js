const prices = [1200, 300, 4500, 800];

console.log(prices.map((price) => price * 2));
console.log(prices.filter((price) => price > 1000));
console.log(prices.find((price) => price < 500));
console.log(prices.find((price) => price > 10000));
console.log(prices.findIndex((price) => price === 4500));
console.log(prices.some((price) => price > 4000));
console.log(prices.every((price) => price > 500));
console.log([].every((price) => price > 500));
console.log(prices);
