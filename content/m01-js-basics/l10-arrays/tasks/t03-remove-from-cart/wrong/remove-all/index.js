export function removeFromCart(cart, sku) {
  let removed = false;
  let index = cart.indexOf(sku);
  while (index !== -1) {
    cart.splice(index, 1);
    removed = true;
    index = cart.indexOf(sku);
  }
  return removed;
}
