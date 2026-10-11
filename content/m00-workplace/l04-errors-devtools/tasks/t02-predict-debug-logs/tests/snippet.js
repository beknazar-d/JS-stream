function finalPrice(price, percent) {
  console.log("price:", price);
  console.log("percent:", percent);
  const discount = price * percent / 100;
  console.log("discount:", discount);
  return price - discount;
}

console.log("Итого:", finalPrice(2000, 15));
console.log("Итого:", finalPrice(500));
