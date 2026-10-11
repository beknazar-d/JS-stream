export function checkQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Количество должно быть целым числом больше нуля');
  }
  return quantity;
}

export function tryQuantity(text) {
}
