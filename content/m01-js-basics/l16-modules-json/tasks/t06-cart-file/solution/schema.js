export const CURRENT_VERSION = 2;

export function migrate(data) {
  if (data === null || typeof data !== 'object' || typeof data.version !== 'number') {
    throw new Error('Файл не похож на корзину');
  }

  if (data.version === 2) {
    return data;
  }

  if (data.version === 1) {
    if (!Array.isArray(data.lines)) {
      throw new Error('Файл не похож на корзину');
    }
    const items = data.lines.map((line) => ({
      sku: line.sku,
      qty: line.qty,
      priceKopecks: Math.round(Number(line.price) * 100),
    }));
    return { version: 2, items };
  }

  throw new Error(`Неподдерживаемая версия файла: ${data.version}`);
}
