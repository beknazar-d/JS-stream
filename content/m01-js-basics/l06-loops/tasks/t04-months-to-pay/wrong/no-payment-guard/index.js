export function monthsToPay(price, monthlyPayment) {
  let rest = price;
  let months = 0;
  while (rest > 0) {
    rest -= monthlyPayment;
    months++;
  }
  return months;
}
