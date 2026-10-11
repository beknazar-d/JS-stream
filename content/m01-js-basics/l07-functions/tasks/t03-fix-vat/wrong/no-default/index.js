export function withVat(price, rate) {
  return price * (1 + rate);
}
