export function withVat(price, rate) {
  rate = rate || 0.2;
  return price * (1 + rate);
}
