export function stockAfterSale(stock, sold) {
  let left = stock;
  left = left - sold;
  return left;
}

export function priceWithVat(price) {
  let vat;
  const total = Number(price) + vat;
  vat = (Number(price) * 20) / 100;
  return total;
}

export function shippingLabel(city) {
  const label = "Доставка: " + city;
  return label;
}
