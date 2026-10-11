import { formatPrice } from './money.js';
import { calcTax } from './tax.js';

export function invoiceLine(name, price, qty) {
  const sum = price * qty;
  return `${name} × ${qty}: ${formatPrice(sum)}, НДС ${formatPrice(calcTax(price))}`;
}
