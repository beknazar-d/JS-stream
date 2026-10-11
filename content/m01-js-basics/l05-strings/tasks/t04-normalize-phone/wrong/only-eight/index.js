export function normalizePhone(raw) {
  let phone = raw
    .trim()
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("(", "")
    .replaceAll(")", "");

  if (phone.startsWith("8")) {
    phone = "+7" + phone.slice(1);
  }

  if (phone.startsWith("+7") && phone.length === 12) {
    return phone;
  }
  return "";
}
