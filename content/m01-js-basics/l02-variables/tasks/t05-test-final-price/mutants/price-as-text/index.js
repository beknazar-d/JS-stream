export function finalPrice(price, vatPercent, shippingFee) {
  const base = price;
  const vat = (base * vatPercent) / 100;
  return base + vat + shippingFee;
}
