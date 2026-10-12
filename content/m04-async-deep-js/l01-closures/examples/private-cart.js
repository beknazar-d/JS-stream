// Корзина с приватным состоянием: список позиций снаружи недоступен.
function createCart() {
  const lines = [];

  return {
    add(sku, price) {
      lines.push({ sku, price });
    },
    total() {
      let sum = 0;
      for (const line of lines) {
        sum = sum + line.price;
      }
      return sum;
    },
    count() {
      return lines.length;
    },
  };
}

const cart = createCart();
cart.add("kettle", 2500);
cart.add("cup", 400);
console.log(cart.count());
console.log(cart.total());
console.log(typeof cart.lines);
