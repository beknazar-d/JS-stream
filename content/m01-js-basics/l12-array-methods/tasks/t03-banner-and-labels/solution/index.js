export function priceLabels(products) {
  return products.map((product) => {
    return product.name + ': ' + product.price + ' ₽';
  });
}

export function hasUnpaid(orders) {
  return orders.some((order) => order.status !== 'paid');
}
