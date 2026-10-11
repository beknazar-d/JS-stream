export function formatPhone(phone) {
  if (!phone.startsWith("+7") || phone.length !== 12) {
    return "не указан";
  }
  const country = phone.slice(0, 2);
  const code = phone.slice(2, 5);
  const first = phone.slice(5, 8);
  const second = phone.slice(8, 10);
  const third = phone.slice(10);
  return `${country} ${code} ${first}-${second}-${third}`;
}

export function shippingLabel(orderId, fullName, city, street, phone) {
  const orderLine = "ЗАКАЗ №" + String(orderId).padStart(6, "0");
  const nameLine = fullName.trim().toUpperCase();
  const addressLine = `г. ${city.trim()}, ${street.trim()}`;
  const phoneLine = "Тел.: " + formatPhone(phone);
  return `${orderLine}\n${nameLine}\n${addressLine}\n${phoneLine}`;
}
