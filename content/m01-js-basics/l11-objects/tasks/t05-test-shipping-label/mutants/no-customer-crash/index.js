export function shippingLabel(order) {
  const address = order.customer.address;
  if (address === undefined || address === null) {
    return 'Адрес не указан';
  }
  const city = address.city ?? 'город не указан';
  if (address.street === undefined) {
    return city;
  }
  return city + ', ' + address.street;
}
