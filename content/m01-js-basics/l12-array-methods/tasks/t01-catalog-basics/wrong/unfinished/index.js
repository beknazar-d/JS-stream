export function productNames(products) {
  return products.map((product) => product.name);
}

export function availableProducts(products) {
  return products.filter((product) => product.quantity > 0);
}

export function findProduct(products, sku) {
}

export function hasOutOfStock(products) {
}
