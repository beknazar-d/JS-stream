export function normalizePhone(raw) {
  let phone = raw
    .trim()
    .replace(" ", "")
    .replace("-", "")
    .replace("(", "")
    .replace(")", "");

  if (phone.startsWith("8")) {
    phone = "+7" + phone.slice(1);
  } else if (phone.startsWith("7")) {
    phone = "+" + phone;
  }

  if (phone.startsWith("+7") && phone.length === 12) {
    return phone;
  }
  return "";
}
