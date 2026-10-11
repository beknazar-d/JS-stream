export function orderLineTotal(priceText, quantityText, discountText, stockText) {
  const price = Number(priceText);
  const quantity = Number(quantityText);
  if (price === NaN || price <= 0) {
    return null;
  }
  if (quantity === NaN || quantity < 1) {
    return null;
  }
  let discount = 5;
  if (discountText !== undefined && discountText !== null && String(discountText).trim() !== '') {
    discount = Number(discountText);
  }
  if (stockText !== undefined && stockText !== null && quantity > Number(stockText)) {
    return null;
  }
  return (price * quantity * (100 - discount)) / 100;
}
