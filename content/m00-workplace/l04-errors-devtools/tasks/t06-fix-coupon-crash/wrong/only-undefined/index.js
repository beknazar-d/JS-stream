function parsePercent(text) {
  if (text === undefined) {
    return 0;
  }
  const percent = Number(text.replace("%", "").trim());
  if (Number.isNaN(percent)) {
    return 0;
  }
  return percent;
}

function discountFor(price, couponText) {
  const percent = parsePercent(couponText);
  return price * percent / 100;
}

export function totalWithCoupon(price, couponText) {
  return price - discountFor(price, couponText);
}
