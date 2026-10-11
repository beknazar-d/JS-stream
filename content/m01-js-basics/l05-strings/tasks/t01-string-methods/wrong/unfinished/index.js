export function normalizeSku(raw) {
  return raw.trim().toUpperCase();
}

export function orderLabel(orderNumber) {
  return "№" + String(orderNumber).padStart(6, "0");
}

export function isRussianPhone(phone) {
  // ваш код
}

export function orderYear(orderNumber) {
  // ваш код
}
