function checkQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Количество должно быть целым числом больше нуля');
  }
  return quantity;
}

console.log(checkQuantity(3));

try {
  console.log(checkQuantity(0));
  console.log('сюда не дойдём');
} catch (error) {
  console.log('Поймали:', error.message);
}

console.log('программа продолжает работу');
