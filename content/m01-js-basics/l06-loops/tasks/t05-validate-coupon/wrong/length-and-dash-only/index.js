export function validateCoupon(code) {
  if (typeof code !== 'string' || code.length !== 9) {
    return false;
  }
  return code[4] === '-';
}
