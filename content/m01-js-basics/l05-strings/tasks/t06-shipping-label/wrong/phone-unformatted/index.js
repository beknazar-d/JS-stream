export function formatPhone(phone) {
  if (!phone.startsWith("+7") || phone.length !== 12) {
    return "не указан";
  }
  return phone;
}

export function shippingLabel(orderId, fullName, city, street, phone) {
  const orderLine = "ЗАКАЗ №" + String(orderId).padStart(6, "0");
  const nameLine = fullName.trim().toUpperCase();
  const addressLine = `г. ${city.trim()}, ${street.trim()}`;
  const phoneLine = "Тел.: " + formatPhone(phone);
  return `${orderLine}\n${nameLine}\n${addressLine}\n${phoneLine}`;
}
