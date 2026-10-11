export function checkQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return false;
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
