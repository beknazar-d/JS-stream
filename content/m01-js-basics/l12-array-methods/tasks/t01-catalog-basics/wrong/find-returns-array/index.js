export function productNames(products) {
  return products.map((product) => product.name);
}

export function availableProducts(products) {
  return products.filter((product) => product.quantity > 0);
}

export function findProduct(products, sku) {
  return products.filter((product) => product.sku === sku);
}

export function hasOutOfStock(products) {
  return products.some((product) => product.quantity === 0);
}
