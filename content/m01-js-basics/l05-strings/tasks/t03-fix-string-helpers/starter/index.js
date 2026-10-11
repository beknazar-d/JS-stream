export function cleanSku(raw) {
  raw.trim();
  raw.toUpperCase();
  return raw;
}

export function compactPhone(phone) {
  return phone.replace(" ", "").replace("-", "").replace("(", "").replace(")", "");
}

export function orderLabel(id) {
  return "Заказ №${id}";
}
