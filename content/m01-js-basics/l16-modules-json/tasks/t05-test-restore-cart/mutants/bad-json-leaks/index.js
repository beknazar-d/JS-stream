export function restoreCart(text) {
  const data = JSON.parse(text);
  if (data === null || typeof data !== 'object' || !Array.isArray(data.items)) {
    throw new Error('Корзина повреждена');
  }
  return {
    items: data.items.map(({ sku, qty }) => ({ sku, qty: Number(qty) })),
  };
}
