export function priceLabels(products) {
  return products.map((product) => {
    product.name + ': ' + product.price + ' ₽';
  });
}

export function hasUnpaid(orders) {
  if (orders.filter((order) => order.status !== 'paid')) {
    return true;
  }
  return false;
}
