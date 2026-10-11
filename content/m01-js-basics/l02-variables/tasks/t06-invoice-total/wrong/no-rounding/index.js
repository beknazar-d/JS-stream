export function invoiceTotal(price, quantity, vatPercent, shippingKopecks) {
  const priceKopecks = Number(price) * 100;
  const netAmount = priceKopecks * Number(quantity);
  const vat = (netAmount * vatPercent) / 100;
  return netAmount + vat + shippingKopecks;
}
