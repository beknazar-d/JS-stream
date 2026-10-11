import formatRub, { formatQty, CURRENCY } from './format.js';

export function describeLine(name, qty, price) {
  return `${name}: ${formatQty(qty)} × ${formatRub(price)} (${CURRENCY})`;
}
