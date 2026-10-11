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
  const price = Number(priceText);
  const quantity = Number(quantityText);

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  if (typeof couponPercent !== 'number' || Number.isNaN(couponPercent) || couponPercent < 0 || couponPercent > 100) {
    return null;
  }

  return applyDiscount(price * quantity, couponPercent);
}
