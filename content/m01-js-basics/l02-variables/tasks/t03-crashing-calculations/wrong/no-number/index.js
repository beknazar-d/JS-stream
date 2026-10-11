export function stockAfterSale(stock, sold) {
  let left = stock;
  left = left - sold;
  return left;
}

export function priceWithVat(price) {
  const vat = (price * 20) / 100;
  const total = price + vat;
  return total;
}

export function shippingLabel(city) {
  const label = "Доставка: " + city;
  return label;
}
