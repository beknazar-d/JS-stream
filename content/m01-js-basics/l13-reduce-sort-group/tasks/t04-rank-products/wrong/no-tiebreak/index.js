export function rankProducts(products) {
  return products.toSorted((a, b) => b.sold - a.sold);
}
