export function validateCoupon(code) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  for (let i = 0; i < 9; i++) {
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
