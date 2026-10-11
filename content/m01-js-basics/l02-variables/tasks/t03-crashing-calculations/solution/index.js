export function stockAfterSale(stock, sold) {
  let left = stock;
  left = left - sold;
  return left;
}

export function priceWithVat(price) {
  const base = Number(price);
  const vat = (base * 20) / 100;
  const total = base + vat;
  return total;
}

export function shippingLabel(city) {
  const label = "Доставка: " + city;
  return label;
}
