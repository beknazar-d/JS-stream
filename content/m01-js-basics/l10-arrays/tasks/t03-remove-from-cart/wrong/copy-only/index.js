export function removeFromCart(cart, sku) {
  const index = cart.indexOf(sku);
  if (index === -1) {
    return false;
  }
  const copy = cart.slice();
  copy.splice(index, 1);
  return true;
}
