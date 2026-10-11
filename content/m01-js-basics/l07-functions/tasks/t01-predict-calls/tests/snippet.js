function shippingCost(weightKg, express = false) {
  const base = 200 + weightKg * 40;
  if (express) {
    return base * 2;
  }
}
console.log(shippingCost(2, true));
console.log(shippingCost(2));

function label(name, count) {
  return `${name} x${count}`;
}
console.log(label("Чайник"));
console.log(label("Чайник", 2, 3));

function total(price, quantity = 1) {
  return price * quantity;
}
console.log(total(300));
console.log(total(300, 0));
console.log(total(300, undefined));
