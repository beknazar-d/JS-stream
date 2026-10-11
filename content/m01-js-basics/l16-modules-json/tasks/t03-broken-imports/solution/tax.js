// Налог. Этот файл используется по всему сайту, менять его не нужно.
export function calcTax(amount) {
  return Math.round(amount * 20) / 100;
}
