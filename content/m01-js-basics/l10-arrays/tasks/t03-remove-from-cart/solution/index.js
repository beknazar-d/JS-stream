export function removeFromCart(cart, sku) {
  const index = cart.indexOf(sku);
  if (index === -1) {
    return false;
  }
  cart.splice(index, 1);
  return true;
}
