export function finalPrice(price, vatPercent, shippingFee) {
  const base = Number(price);
  const vat = (base * vatPercent) / 100;
  return base + vat;
}
