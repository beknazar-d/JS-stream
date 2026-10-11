export function applyPatch(order, patch) {
  const { id, ...changes } = patch;
  return {
    ...order,
    ...changes,
  };
}
