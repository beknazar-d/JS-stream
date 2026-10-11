export function orderLineTotal(priceText, quantityText, discountText, stockText) {
  const price = Number(priceText);
  const quantity = Number(quantityText);

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }

  let discount = 5;
  const discountGiven =
    discountText !== undefined && discountText !== null && String(discountText).trim() !== '';
  if (discountGiven) {
    discount = Number(discountText);
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      return null;
    }
  }

  if (stockText !== undefined && stockText !== null) {
    const stock = Number(stockText);
    if (String(stockText).trim() === '' || !Number.isInteger(stock) || stock < 0 || quantity > stock) {
      return null;
    }
  }

  return (price * quantity * (100 - discount)) / 100;
}
