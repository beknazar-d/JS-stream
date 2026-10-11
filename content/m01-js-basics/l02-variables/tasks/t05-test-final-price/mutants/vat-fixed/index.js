export function finalPrice(price, vatPercent, shippingFee) {
  const base = Number(price);
  const vat = (base * 20) / 100;
  return base + vat + shippingFee;
}
