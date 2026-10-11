function reserve(stock, qty) {
  console.log('начали резерв');
  try {
    if (qty > stock) {
      throw new Error('Недостаточно товара');
    }
    console.log('резерв удался');
    return stock - qty;
  } catch (error) {
    console.log('ошибка:', error.message);
    return stock;
  } finally {
    console.log('освободили блокировку');
  }
}

console.log(reserve(10, 3));
console.log(reserve(10, 30));
