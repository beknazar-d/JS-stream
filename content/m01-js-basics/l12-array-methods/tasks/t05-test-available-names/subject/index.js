export function availableNames(products, maxPrice) {
  return products
    .filter((product) => product.quantity > 0)
    .filter((product) => maxPrice === undefined || product.price <= maxPrice)
    .map((product) => product.name);
}
