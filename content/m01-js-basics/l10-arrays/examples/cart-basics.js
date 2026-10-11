// Корзина — это массив названий товаров.
const cart = ["кроссовки", "носки", "кепка"];

console.log(cart[0]);
console.log(cart[2]);
console.log(cart[3]);
console.log(cart.length);
console.log(cart.at(-1));

// push и unshift возвращают новую длину, pop и shift — убранный элемент.
console.log(cart.push("перчатки"));
console.log(cart.pop());
console.log(cart.shift());
cart.unshift("шарф");
console.log(cart);
