export function calcOrderTotal(form) {
  const price = Number(form.price);
  const quantity = Number(form.quantity);
  const discount = form.discountPercent === undefined || form.discountPercent === '' ? 0 : Number(form.discountPercent);
  const priceInKopecks = Math.round(price * 100);
  return Math.round((priceInKopecks * quantity * (100 - discount)) / 100);
}
