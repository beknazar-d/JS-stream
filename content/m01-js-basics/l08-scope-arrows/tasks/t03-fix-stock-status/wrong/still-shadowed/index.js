export function stockStatus(stock) {
  let status = '';
  if (stock > 10) {
    const status = 'В наличии';
  } else if (stock > 0) {
    const status = 'Мало';
  } else {
    const status = 'Нет в наличии';
  }
  return status;
}
