import { canReserve } from './stock.js';
import discountFor from './discount.js';

const roundKopecks = (value) => Math.round(value * 100) / 100;

export function quote(cart, stock, prices) {
  const lines = cart.map(({ sku, qty }) => {
    if (!canReserve(stock, sku, qty)) {
      return { sku, qty, ok: false, total: 0 };
    }
    const total = roundKopecks(prices[sku] * qty * (1 - discountFor(qty)));
    return { sku, qty, ok: true, total };
  });
  const total = roundKopecks(lines.reduce((sum, line) => sum + line.total, 0));
  return { lines, total };
}
