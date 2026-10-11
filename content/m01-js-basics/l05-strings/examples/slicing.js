const order = "ORD-2024-0042";

console.log(order.length);
console.log(order[0]);
console.log(order[order.length - 1]);
console.log(order[100]);

console.log(order.slice(4, 8));
console.log(order.slice(9));
console.log(order.slice(-4));
console.log(order.slice(0, 3));

console.log(order.includes("2024"));
console.log(order.includes("ord"));
console.log(order.startsWith("ORD"));
console.log(order.indexOf("-"));
console.log(order.indexOf("zz"));
