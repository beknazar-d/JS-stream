export function cleanSku(raw) {
  return raw.trim().toUpperCase();
}

export function compactPhone(phone) {
  return phone.replaceAll(" ", "");
}

export function orderLabel(id) {
  return `Заказ №${id}`;
}
