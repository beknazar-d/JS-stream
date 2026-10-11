export function stockStatus(stock) {
  let status = 'В наличии';
  if (stock <= 0) {
    status = 'Нет в наличии';
  }
  return status;
}
