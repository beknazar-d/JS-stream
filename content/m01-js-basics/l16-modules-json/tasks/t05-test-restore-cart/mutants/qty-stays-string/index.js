export function restoreCart(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error('Корзина повреждена');
  }
  if (data === null || typeof data !== 'object' || !Array.isArray(data.items)) {
    throw new Error('Корзина повреждена');
  }
  return {
    items: data.items.map(({ sku, qty }) => ({ sku, qty })),
  };
}
