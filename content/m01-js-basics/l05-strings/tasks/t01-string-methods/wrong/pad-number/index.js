export function normalizeSku(raw) {
  return raw.trim().toUpperCase();
}

export function orderLabel(orderNumber) {
  return "№" + orderNumber.padStart(6, "0");
}

export function isRussianPhone(phone) {
  return phone.startsWith("+7");
}

export function orderYear(orderNumber) {
  return orderNumber.slice(4, 8);
}
