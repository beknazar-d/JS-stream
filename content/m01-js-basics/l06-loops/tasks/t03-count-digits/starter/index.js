export function countDigits(code) {
  if (typeof code !== 'string') {
    return 0;
  }
  let digits = 0;
  for (let i = 1; i <= code.length; i++) {
    const char = code[i];
    if ('0123456789'.includes(char)) {
      digits++;
    }
  }
  return digits;
}
