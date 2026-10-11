export function validateCoupon(code) {
  if (typeof code !== 'string' || code.length !== 9) {
    return false;
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (i < 4) {
      if (!letters.includes(char)) {
        return false;
      }
    } else if (i === 4) {
      if (char !== '-') {
        return false;
      }
    } else if (!digits.includes(char)) {
      return false;
    }
  }
  return true;
}
