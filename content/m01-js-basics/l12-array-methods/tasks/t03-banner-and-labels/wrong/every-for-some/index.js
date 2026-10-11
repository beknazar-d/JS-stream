export function priceLabels(products) {
  return products.map((product) => product.name + ': ' + product.price + ' ₽');
}

export function hasUnpaid(orders) {
  return orders.every((order) => order.status !== 'paid');
}
