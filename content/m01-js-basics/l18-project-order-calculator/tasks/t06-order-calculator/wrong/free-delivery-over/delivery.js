export const FREE_DELIVERY_FROM = 300000;
export const DELIVERY_PRICE = 29900;

// Доставка в копейках: бесплатная от порога, иначе фиксированная.
export function deliveryCost(goods) {
  return goods > FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
}
