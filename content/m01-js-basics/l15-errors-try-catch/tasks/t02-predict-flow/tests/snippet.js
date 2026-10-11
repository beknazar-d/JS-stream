class StockError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StockError';
  }
}

function reserve(stock, qty) {
  if (qty > stock) {
    throw new StockError(`На складе только ${stock}`);
  }
  return stock - qty;
}

try {
  console.log('старт');
  console.log(reserve(10, 3));
  console.log(reserve(10, 30));
  console.log('не выведется');
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error instanceof StockError, error instanceof Error);
} finally {
  console.log('готово');
}

console.log(String(new Error('x')));
