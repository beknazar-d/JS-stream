let last = 0;

export function createNumbering(prefix) {
  return function nextNumber() {
    last = last + 1;
    return prefix + '-' + String(last).padStart(4, '0');
  };
}
