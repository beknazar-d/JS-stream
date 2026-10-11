export function lineTotal(price, quantity) {
  return price * quantity;
}

export const withShipping = (amount, shipping = 350) => {
  return amount + shipping;
};

export function stockLabel(stock) {
  let unit;
  const label = `Остаток: ${stock}${unit}`;
  unit = ' шт.';
  return label;
}
