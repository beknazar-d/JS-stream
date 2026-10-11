function parsePercent(text) {
  return Number(text.replace("%", ""));
}

function discountFor(price, couponText) {
  const percent = parsePercent(couponText);
  return price * percent / 100;
}

export function totalWithCoupon(price, couponText) {
  if (!couponText) {
    return 0;
  }
  return price - discountFor(price, couponText);
}
