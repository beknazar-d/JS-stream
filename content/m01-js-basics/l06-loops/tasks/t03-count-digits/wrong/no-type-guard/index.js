export function countDigits(code) {
  let digits = 0;
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if ('0123456789'.includes(char)) {
      digits++;
    }
  }
  return digits;
}
