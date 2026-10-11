export function checkQuantity(quantity) {
  if (typeof quantity !== 'number' || !(quantity > 0)) {
    throw new Error('Количество должно быть целым числом больше нуля');
  }
  return quantity;
}

export function tryQuantity(text) {
  try {
    return { ok: true, value: checkQuantity(Number(text)) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
