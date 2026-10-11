export function countDigits(code) {
  if (typeof code !== 'string') {
    return 0;
  }
  let digits = 0;
  for (let i = 0; i < code.length; i++) {
    if (Number(code[i])) {
      digits++;
    }
  }
  return digits;
}
