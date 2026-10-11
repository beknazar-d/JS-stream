export function rankProducts(products) {
  return products.toSorted((a, b) => {
    const bySold = a.sold - b.sold;
    if (bySold !== 0) {
      return bySold;
    }
    return a.name.localeCompare(b.name, 'ru');
  });
}
