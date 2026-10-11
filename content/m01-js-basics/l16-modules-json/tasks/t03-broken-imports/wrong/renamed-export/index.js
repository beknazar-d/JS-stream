import { formatMoney } from './money.js';
import { calcTax } from './tax.js';

export function invoiceLine(name, price, qty) {
  const sum = price * qty;
  return `${name} × ${qty}: ${formatMoney(sum)}, НДС ${formatMoney(calcTax(sum))}`;
}
