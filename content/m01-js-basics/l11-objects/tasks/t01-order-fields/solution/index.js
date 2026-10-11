export function fieldNames(order) {
  return Object.keys(order);
}

export function hasField(order, field) {
  return Object.hasOwn(order, field);
}

export function deliveryCity(order) {
  return order.customer?.address?.city ?? 'город не указан';
}
