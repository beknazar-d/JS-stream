export function withVat(price, rate = 0.2) {
  return price * (1 + rate);
}
