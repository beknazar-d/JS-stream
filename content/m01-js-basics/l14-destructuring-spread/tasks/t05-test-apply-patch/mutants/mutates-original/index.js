export function applyPatch(order, patch) {
  const { id, ...changes } = patch;
  Object.assign(order, changes, {
    customer: { ...order.customer, ...changes.customer },
  });
  return order;
}
