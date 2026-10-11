export function invoiceTotal(price, quantity, vatPercent, shippingKopecks) {
  const priceKopecks = Math.round(Number(price) * 100);
  const netAmount = priceKopecks * Number(quantity);
  const vat = Math.round((netAmount * vatPercent) / 100);
  const total = netAmount + vat + shippingKopecks;
  return total;
}
