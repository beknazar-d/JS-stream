export function rankProducts(products) {
  return products.toSorted((a, b) => {
    const bySold = b.sold - a.sold;
    if (bySold !== 0) {
      return bySold;
    }
    return a.name.localeCompare(b.name, 'ru');
  });
}
