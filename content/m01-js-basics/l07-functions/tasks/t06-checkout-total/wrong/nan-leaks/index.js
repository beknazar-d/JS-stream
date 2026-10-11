export function applyDiscount(amount, percent = 0) {
  return amount - (amount * percent) / 100;
}

export function shippingFor(amount) {
  if (amount >= 5000) {
    return 0;
  }
  return 350;
}

export function checkoutTotal(priceText, quantityText, couponPercent = 0) {
  const goods = Number(priceText) * Number(quantityText);
  const discounted = applyDiscount(goods, couponPercent);
  return discounted + shippingFor(discounted);
}
