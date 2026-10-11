export function withVat(price, rate) {
  rate = rate || 0.2;
  price * (1 + rate);
}
