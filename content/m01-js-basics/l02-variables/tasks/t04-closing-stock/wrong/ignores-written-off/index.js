export function closingStock(opening, delivered, sold, writtenOff) {
  let stock = Number(opening);
  stock = stock + Number(delivered);
  stock = stock - Number(sold);
  return stock;
}
