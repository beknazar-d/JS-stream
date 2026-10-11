export function withVat(price, rate = 0.2) {
  console.log(price * (1 + rate));
}
