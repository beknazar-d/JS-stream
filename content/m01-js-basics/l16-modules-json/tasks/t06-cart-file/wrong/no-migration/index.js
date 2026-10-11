import { exportCart, importCart } from './cart-file.js';

export function totalKopecks(items) {
  return items.reduce((sum, item) => sum + item.qty * item.priceKopecks, 0);
}

export function roundTrip(items) {
  return importCart(exportCart(items));
}
