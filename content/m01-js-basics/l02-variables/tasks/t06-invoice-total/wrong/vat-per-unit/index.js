export function invoiceTotal(price, quantity, vatPercent, shippingKopecks) {
  const priceKopecks = Math.round(Number(price) * 100);
  const vatPerUnit = Math.round((priceKopecks * vatPercent) / 100);
  const total = (priceKopecks + vatPerUnit) * Number(quantity);
  return total + shippingKopecks;
}
