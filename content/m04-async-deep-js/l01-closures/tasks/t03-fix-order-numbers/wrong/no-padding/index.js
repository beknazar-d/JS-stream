export function createNumbering(prefix) {
  let last = 0;
  return function nextNumber() {
    last = last + 1;
    return prefix + '-' + last;
  };
}
