export function removeFromCart(cart, sku) {
  const index = cart.indexOf(sku);
  cart.splice(index, 1);
  return true;
}
