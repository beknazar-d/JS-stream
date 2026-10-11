const prices = [10, 9, 1, 100];

console.log(prices.sort());
console.log(prices);

const sorted = prices.toSorted((a, b) => a - b);
console.log(sorted);
console.log(prices);

console.log(prices.reduce((sum, price) => sum + price, 0));
console.log([].reduce((sum, price) => sum + price, 5));
console.log([3, 1, 2].reduce((max, n) => (n > max ? n : max), 0));
