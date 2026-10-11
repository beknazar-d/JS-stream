export function calcOrderTotal(form) {
  const price = Number(form.price);
  const quantity = Number(form.quantity);
  const discountText = form.discountPercent === undefined ? '' : String(form.discountPercent).trim();
  const discount = discountText === '' ? 0 : Number(discountText);

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  if (!Number.isInteger(discount)) {
    return null;
  }

  const priceInKopecks = Math.round(price * 100);
  return Math.round((priceInKopecks * quantity * (100 - discount)) / 100);
}
