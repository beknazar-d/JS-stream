export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cheapestFirst(items) {
  return items.toSorted((a, b) => a.price > b.price);
}
