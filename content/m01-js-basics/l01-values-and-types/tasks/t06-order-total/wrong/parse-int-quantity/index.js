export function calcOrderTotal(form) {
  const price = Number(form.price);
  const quantity = parseInt(form.quantity, 10);
  const discountText = form.discountPercent === undefined ? '' : String(form.discountPercent).trim();
  const discount = discountText === '' ? 0 : parseInt(discountText, 10);

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }
  if (Number.isNaN(quantity) || quantity < 1) {
    return null;
  }
  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    return null;
  }

  const priceInKopecks = Math.round(price * 100);
  return Math.round((priceInKopecks * quantity * (100 - discount)) / 100);
}
