export function setStatus(order, status) {
  return { ...order, status };
}

export function addLine(order, line) {
  const exists = order.lines.some((item) => item.sku === line.sku);
  const lines = exists
    ? order.lines.map((item) => (item.sku === line.sku ? { ...item, qty: item.qty + line.qty } : item))
    : [...order.lines, line];
  return { ...order, lines };
}

export function changeCity(order, city) {
  const copy = { ...order };
  copy.customer.address.city = city;
  return copy;
}
