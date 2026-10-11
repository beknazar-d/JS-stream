function parsePercent(text) {
  if (text === undefined || text === null) {
    return 0;
  }
  return Number(text.replace("%", "").trim());
}

function discountFor(price, couponText) {
  const percent = parsePercent(couponText);
  return price * percent / 100;
}

export function totalWithCoupon(price, couponText) {
  return price - discountFor(price, couponText);
}
