export function priceLabels(products) {
  return products.map((product) => product.name + ': ' + (product.price || 'цена по запросу') + ' ₽');
}

export function hasUnpaid(orders) {
  return orders.some((order) => order.status !== 'paid');
}
