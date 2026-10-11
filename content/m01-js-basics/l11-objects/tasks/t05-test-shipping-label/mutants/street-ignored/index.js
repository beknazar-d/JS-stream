export function shippingLabel(order) {
  const address = order.customer?.address;
  if (address === undefined || address === null) {
    return 'Адрес не указан';
  }
  return address.city ?? 'город не указан';
}
