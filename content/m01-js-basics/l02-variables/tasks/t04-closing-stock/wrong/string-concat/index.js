export function closingStock(opening, delivered, sold, writtenOff) {
  let stock = opening;
  stock = stock + delivered;
  stock = stock - sold;
  stock = stock - writtenOff;
  return stock;
}
