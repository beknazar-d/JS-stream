export function lineTotal(price, quantity) {
  return price * quantity;
}

export const withShipping = (amount, shipping) => amount + (shipping || 350);

export function stockLabel(stock) {
  const unit = ' шт.';
  const label = `Остаток: ${stock}${unit}`;
  return label;
}
