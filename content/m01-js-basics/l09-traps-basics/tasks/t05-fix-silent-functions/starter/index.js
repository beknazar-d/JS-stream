export function lineTotal(price, quantity) {
  return
    price * quantity;
}

export const withShipping = (amount, shipping = 350) => {
  amount + shipping;
};

export function stockLabel(stock) {
  const label = `Остаток: ${stock}${unit}`;
  const unit = ' шт.';
  return label;
}
