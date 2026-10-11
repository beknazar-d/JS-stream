export function applyDiscount(price, discountPercent) {
  const percent = discountPercent ?? 10;
  return price - (price * percent) / 100;
}

export function isFreeShipping(orderSum) {
  return orderSum >= 5000;
}

export function averageHandlingMinutes(first, second) {
  return first + second / 2;
}
