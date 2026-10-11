import { ValidationError } from './errors.js';
import { discountSummary } from './discounts.js';
import { deliveryCost } from './delivery.js';
import { vatIncluded } from './vat.js';

export function calculateOrder(cart, promoCode) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new ValidationError('Корзина пуста');
  }

  const { subtotal, volume, promo, total: goods } = discountSummary(cart, promoCode);
  const delivery = deliveryCost(goods);
  const total = goods + delivery;

  return {
    lines: cart.map((line) => ({ ...line, total: line.price * line.qty })),
    subtotal,
    volume,
    promo,
    goods,
    delivery,
    vat: vatIncluded(total),
    total,
  };
}
