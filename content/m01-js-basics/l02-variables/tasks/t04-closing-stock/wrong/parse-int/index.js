export function closingStock(opening, delivered, sold, writtenOff) {
  let stock = parseInt(opening);
  stock = stock + parseInt(delivered);
  stock = stock - parseInt(sold);
  stock = stock - parseInt(writtenOff);
  return stock;
}
