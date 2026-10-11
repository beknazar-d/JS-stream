export function stockStatus(stock) {
  let status;
  if (stock > 10) {
    status = 'В наличии';
  } else if (stock > 0) {
    status = 'Мало';
  } else {
    status = 'Нет в наличии';
  }
  return status;
}
