import { CURRENT_VERSION } from './schema.js';

export function exportCart(items) {
  return JSON.stringify({ version: CURRENT_VERSION, items }, null, 2);
}

export function importCart(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error('Файл повреждён: это не JSON');
  }

  const data = parsed;
  if (!Array.isArray(data.items)) {
    throw new Error('Файл не похож на корзину');
  }

  return data.items.map((item, index) => {
    const { sku, qty, priceKopecks } = item ?? {};
    const valid =
      typeof sku === 'string' &&
      sku.trim() !== '' &&
      Number.isInteger(qty) &&
      qty > 0 &&
      Number.isInteger(priceKopecks) &&
      priceKopecks >= 0;
    if (!valid) {
      throw new Error(`Позиция ${index + 1}: некорректные данные`);
    }
    return { sku, qty, priceKopecks };
  });
}
