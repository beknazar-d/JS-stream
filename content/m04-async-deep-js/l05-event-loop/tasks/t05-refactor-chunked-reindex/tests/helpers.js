export const makeProducts = (count) => Array.from({ length: count }, (_, i) => ({ sku: `SKU-${i + 1}` }));
