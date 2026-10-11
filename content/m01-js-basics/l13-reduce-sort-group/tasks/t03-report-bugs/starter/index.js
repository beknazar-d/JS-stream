export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity);
}

export function cheapestFirst(items) {
  return items.sort((a, b) => a.price - b.price);
}
