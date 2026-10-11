export function removeFromCart(cart, sku) {
  const index = cart.indexOf(sku);
  if (index > 0) {
    cart.splice(index, 1);
    return true;
  }
  return false;
}
