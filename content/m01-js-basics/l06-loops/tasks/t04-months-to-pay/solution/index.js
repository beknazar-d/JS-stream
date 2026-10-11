export function monthsToPay(price, monthlyPayment) {
  if (typeof price !== 'number' || typeof monthlyPayment !== 'number') {
    return null;
  }
  if (!Number.isFinite(price) || !Number.isFinite(monthlyPayment) || monthlyPayment <= 0) {
    return null;
  }

  let rest = price;
  let months = 0;
  while (rest > 0) {
    rest -= monthlyPayment;
    months++;
  }
  return months;
}
