export function applyPatch(order, patch) {
  return {
    ...order,
    ...patch,
    customer: { ...order.customer, ...patch.customer },
  };
}
