const cart = ["кроссовки", "носки", "кепка"];

console.log(cart.includes("носки"));
console.log(cart.includes("шарф"));
console.log(cart.indexOf("кепка"));
console.log(cart.indexOf("шарф"));

for (const item of cart) {
  console.log("В корзине: " + item);
}
