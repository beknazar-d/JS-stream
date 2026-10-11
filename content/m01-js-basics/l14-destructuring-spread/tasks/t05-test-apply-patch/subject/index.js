// Применяет правку оператора к заказу и возвращает новый заказ.
export function applyPatch(order, patch) {
  const { id, ...changes } = patch;
  return {
    ...order,
    ...changes,
    customer: { ...order.customer, ...changes.customer },
  };
}
