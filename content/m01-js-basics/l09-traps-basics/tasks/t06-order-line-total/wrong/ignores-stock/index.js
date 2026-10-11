export function orderLineTotal(priceText, quantityText, discountText) {
  const price = Number(priceText);
  const quantity = Number(quantityText);
  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  let discount = 5;
  if (discountText !== undefined && discountText !== null && String(discountText).trim() !== '') {
    discount = Number(discountText);
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      return null;
    }
  }
  return (price * quantity * (100 - discount)) / 100;
}
